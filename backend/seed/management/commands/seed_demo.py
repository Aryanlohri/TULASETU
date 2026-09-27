import uuid
from django.core.management.base import BaseCommand
from django.utils import timezone
from datetime import timedelta, date
from accounts.models import User
from traders.models import TraderProfile, Instrument
from applications.models import Application
from inspections.models import Inspection
from certificates.models import Certificate, BlockchainAnchor
from certificates.hasher import hash_certificate
from certificates.qr_generator import generate_qr
from rules.models import StateConfig
from blockchain.client import blockchain_client


class Command(BaseCommand):
    help = 'Seeds the database with comprehensive demo data for TulaSetu'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.MIGRATE_HEADING('\n  Seeding TulaSetu demo data...\n'))

        # ── State Config ──────────────────────────────────────────
        state_config, _ = StateConfig.objects.get_or_create(
            state_id='MP',
            defaults={
                'state_name': 'Madhya Pradesh',
                'config_data': {
                    'state_name': 'Madhya Pradesh',
                    'fees': {
                        'NEW': {'WEIGHING': 500, 'MEASURING': 300, 'VOLUMETRIC': 400},
                        'RENEWAL': {'WEIGHING': 250, 'MEASURING': 150, 'VOLUMETRIC': 200},
                        'RE_VERIFICATION': {'WEIGHING': 350, 'MEASURING': 200, 'VOLUMETRIC': 300}
                    },
                    'renewal_period_months': 12,
                    'inspection_sla_days': 15,
                    'supported_instrument_types': ['WEIGHING', 'MEASURING', 'VOLUMETRIC'],
                    'sops': {
                        'WEIGHING': {'error_tolerance_percent': 0.5, 'min_test_loads': 3},
                        'MEASURING': {'error_tolerance_percent': 0.3, 'min_test_loads': 2},
                        'VOLUMETRIC': {'error_tolerance_percent': 0.5, 'min_test_loads': 2}
                    }
                }
            }
        )
        self.stdout.write(f'  ✓ State config: Madhya Pradesh (MP)')

        # ── Users ─────────────────────────────────────────────────
        users_data = [
            ('trader@tulasetu.in', 'Rajesh Kumar Sharma', 'TRADER', '9876543210'),
            ('trader2@tulasetu.in', 'Priya Patel', 'TRADER', '9876543211'),
            ('trader3@tulasetu.in', 'Mohammed Arif Khan', 'TRADER', '9876543212'),
            ('lmo@tulasetu.in', 'Dr. Sunita Verma', 'LMO', '9876543213'),
            ('gatc@tulasetu.in', 'Ashok Tiwari', 'GATC', '9876543214'),
            ('citizen@tulasetu.in', 'Ananya Singh', 'CITIZEN', '9876543215'),
        ]

        created_users = {}
        for email, name, role, phone in users_data:
            user, created = User.objects.get_or_create(
                email=email,
                defaults={
                    'full_name': name,
                    'role': role,
                    'state_id': 'MP',
                    'phone': phone,
                }
            )
            if created:
                user.set_password('demo1234')
                user.save()
            created_users[email] = user

        self.stdout.write(f'  ✓ Created {len(users_data)} users')

        # ── Trader Profiles ───────────────────────────────────────
        profiles_data = [
            ('trader@tulasetu.in', 'Sharma Kirana Store', 'Retail', '123 MG Road, Bhopal, MP 462001', '23AABCS1234A1Z5', 'LM-MP-2024-001'),
            ('trader2@tulasetu.in', 'Patel Jewellers', 'Jewellery', '45 Nehru Nagar, Indore, MP 452001', '23AABCP5678B2Z6', 'LM-MP-2024-002'),
            ('trader3@tulasetu.in', 'Khan Fuel Station', 'Fuel', '78 Station Road, Jabalpur, MP 482001', '23AABCK9012C3Z7', 'LM-MP-2024-003'),
        ]

        created_profiles = {}
        for email, biz_name, biz_type, address, gstin, license_no in profiles_data:
            user = created_users[email]
            profile, _ = TraderProfile.objects.get_or_create(
                user=user,
                defaults={
                    'business_name': biz_name,
                    'business_type': biz_type,
                    'address': address,
                    'gstin': gstin,
                    'license_number': license_no,
                    'identity_verified': True,
                    'identity_provider': 'mock_aadhaar',
                    'state_id': 'MP',
                }
            )
            created_profiles[email] = profile

        self.stdout.write(f'  ✓ Created {len(profiles_data)} trader profiles')

        # ── Instruments ───────────────────────────────────────────
        instruments_data = [
            ('trader@tulasetu.in', 'WEIGHING', 'Counter Scale', 'Avery India', 'DS-50', 'AVR-2024-001', 50.00, 0.005, 'Shop Floor, 123 MG Road, Bhopal', 23.2599, 77.4126),
            ('trader@tulasetu.in', 'WEIGHING', 'Platform Scale', 'Essae', 'SI-300P', 'ESS-2024-002', 300.00, 0.050, 'Warehouse, 123 MG Road, Bhopal', 23.2600, 77.4127),
            ('trader2@tulasetu.in', 'WEIGHING', 'Precision Balance', 'Shimadzu', 'ATX224', 'SHM-2024-003', 0.22, 0.0001, 'Workshop, 45 Nehru Nagar, Indore', 22.7196, 75.8577),
            ('trader2@tulasetu.in', 'MEASURING', 'Length Measure', 'Mitutoyo', 'MT-500', 'MIT-2024-004', 500.00, 1.0000, 'Counter, 45 Nehru Nagar, Indore', 22.7197, 75.8578),
            ('trader3@tulasetu.in', 'VOLUMETRIC', 'Fuel Dispenser', 'Gilbarco', 'SK700-II', 'GIL-2024-005', 9999.00, 0.0100, 'Pump 1, 78 Station Road, Jabalpur', 23.1815, 79.9864),
            ('trader3@tulasetu.in', 'VOLUMETRIC', 'Fuel Dispenser', 'Tokheim', 'Q330', 'TOK-2024-006', 9999.00, 0.0100, 'Pump 2, 78 Station Road, Jabalpur', 23.1816, 79.9865),
        ]

        created_instruments = []
        for email, inst_type, category, make, model_name, serial, capacity, lc, loc_addr, lat, lng in instruments_data:
            profile = created_profiles[email]
            instrument, _ = Instrument.objects.get_or_create(
                serial_number=serial,
                defaults={
                    'trader': profile,
                    'type': inst_type,
                    'category': category,
                    'make': make,
                    'model_name': model_name,
                    'capacity': capacity,
                    'least_count': lc,
                    'location_address': loc_addr,
                    'location_lat': lat,
                    'location_lng': lng,
                    'state_id': 'MP',
                }
            )
            created_instruments.append(instrument)

        self.stdout.write(f'  ✓ Created {len(instruments_data)} instruments')

        # ── Applications ──────────────────────────────────────────
        lmo_user = created_users['lmo@tulasetu.in']
        gatc_user = created_users['gatc@tulasetu.in']
        now = timezone.now()

        apps_data = [
            # (instrument_idx, app_type, status, officer, fee)
            (0, 'NEW', 'CERTIFIED', lmo_user, 500),   # Will get a certificate
            (2, 'NEW', 'CERTIFIED', gatc_user, 500),   # Will get a certificate
            (4, 'NEW', 'APPROVED', lmo_user, 400),     # Ready for certification
            (1, 'NEW', 'SCHEDULED', lmo_user, 500),    # Pending inspection
            (3, 'NEW', 'SUBMITTED', None, 300),        # Newly submitted
            (5, 'RENEWAL', 'ASSIGNED', gatc_user, 200), # Assigned to officer
        ]

        created_applications = []
        for idx, (inst_idx, app_type, status, officer, fee) in enumerate(apps_data):
            instrument = created_instruments[inst_idx]
            app_number = f'TS-MP-{now.year}-{idx+1:05d}'
            app, _ = Application.objects.get_or_create(
                application_number=app_number,
                defaults={
                    'trader': instrument.trader,
                    'instrument': instrument,
                    'app_type': app_type,
                    'status': status,
                    'assigned_officer': officer,
                    'fee_amount': fee,
                    'fee_paid': status != 'SUBMITTED',
                    'notes': f'Demo application for {instrument.make} {instrument.model_name}',
                    'state_id': 'MP',
                }
            )
            created_applications.append(app)

        self.stdout.write(f'  ✓ Created {len(apps_data)} applications')

        # ── Inspections ───────────────────────────────────────────
        inspections_data = [
            # (app_idx, officer, status, result, is_offline)
            (0, lmo_user, 'COMPLETED', 'PASS', False),
            (1, gatc_user, 'COMPLETED', 'PASS', True),   # Offline sync demo
            (3, lmo_user, 'SCHEDULED', '', False),         # Pending
        ]

        for app_idx, officer, insp_status, result, is_offline in inspections_data:
            app = created_applications[app_idx]
            Inspection.objects.get_or_create(
                application=app,
                defaults={
                    'officer': officer,
                    'scheduled_date': (now - timedelta(days=5)).date(),
                    'actual_timestamp': now - timedelta(days=3) if insp_status == 'COMPLETED' else None,
                    'status': insp_status,
                    'location_lat': 23.2599 if app_idx == 0 else 22.7196,
                    'location_lng': 77.4126 if app_idx == 0 else 75.8577,
                    'reading_data': {
                        'test_load_1': {'applied': '10kg', 'measured': '10.002kg', 'error': '0.02%'},
                        'test_load_2': {'applied': '25kg', 'measured': '25.008kg', 'error': '0.032%'},
                        'test_load_3': {'applied': '50kg', 'measured': '50.015kg', 'error': '0.03%'},
                    } if result == 'PASS' else {},
                    'remarks': 'All readings within tolerance limits. Instrument in good condition.' if result == 'PASS' else '',
                    'result': result,
                    'is_offline_sync': is_offline,
                    'offline_captured_at': now - timedelta(days=3) if is_offline else None,
                    'synced_at': now - timedelta(days=3, hours=-1) if is_offline else None,
                    'state_id': 'MP',
                }
            )

        self.stdout.write(f'  ✓ Created {len(inspections_data)} inspections')

        # ── Certificates ──────────────────────────────────────────
        cert_apps = [created_applications[0], created_applications[1]]  # CERTIFIED apps

        for idx, app in enumerate(cert_apps):
            cert_number = f'TS-MP-{now.year}-C{idx+1:04d}'
            cert, created = Certificate.objects.get_or_create(
                certificate_number=cert_number,
                defaults={
                    'application': app,
                    'instrument': app.instrument,
                    'trader': app.trader,
                    'issued_by': app.assigned_officer,
                    'valid_from': (now - timedelta(days=30)).date(),
                    'valid_until': (now + timedelta(days=335)).date(),
                    'status': 'ACTIVE',
                    'state_id': 'MP',
                }
            )

            if created:
                # Hash the certificate
                cert_hash = hash_certificate(cert)
                cert.blockchain_hash = cert_hash

                # Anchor to blockchain (sidecar)
                try:
                    anchor_res = blockchain_client.anchor_certificate(
                        certificate_id=str(cert.id),
                        cert_hash=cert_hash,
                        timestamp=now.isoformat(),
                        issuer_id=str(app.assigned_officer.id)
                    )
                    cert.blockchain_tx_id = anchor_res.get('txId', anchor_res.get('tx_id', f'demo-tx-{idx+1}'))
                except Exception:
                    cert.blockchain_tx_id = f'demo-tx-{idx+1}'

                cert.save()

                # Create blockchain anchor record
                BlockchainAnchor.objects.get_or_create(
                    certificate=cert,
                    defaults={
                        'tx_id': cert.blockchain_tx_id,
                        'certificate_hash': cert_hash,
                        'anchor_timestamp': now,
                        'issuer_id': str(app.assigned_officer.id),
                        'block_number': idx + 1,
                        'verified': True,
                    }
                )

                # Generate QR code
                try:
                    generate_qr(cert)
                except Exception as e:
                    self.stdout.write(self.style.WARNING(f'  ⚠ QR generation skipped: {e}'))

        self.stdout.write(f'  ✓ Created {len(cert_apps)} certificates with blockchain anchors')

        # ── Print Credentials ─────────────────────────────────────
        self.stdout.write(self.style.SUCCESS('\n' + '═' * 55))
        self.stdout.write(self.style.SUCCESS('  TulaSetu Demo Data Seeded Successfully!'))
        self.stdout.write(self.style.SUCCESS('═' * 55))
        self.stdout.write('')
        self.stdout.write('  Demo Credentials (all passwords: demo1234)')
        self.stdout.write('  ' + '─' * 50)
        self.stdout.write(f'  {"Role":<10} {"Email":<30} {"Password"}')
        self.stdout.write('  ' + '─' * 50)
        for email, name, role, _ in users_data:
            self.stdout.write(f'  {role:<10} {email:<30} demo1234')
        self.stdout.write('  ' + '─' * 50)
        self.stdout.write('')
        self.stdout.write('  Pre-issued Certificates:')
        for cert in Certificate.objects.all()[:5]:
            self.stdout.write(f'    • {cert.certificate_number} (ID: {cert.id})')
        self.stdout.write('')
        self.stdout.write(self.style.SUCCESS('═' * 55 + '\n'))

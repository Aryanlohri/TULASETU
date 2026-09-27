const cameraApi = {
    stream: null,
    
    openCamera: async (videoEl) => {
        try {
            const constraints = { video: { facingMode: 'environment' } };
            cameraApi.stream = await navigator.mediaDevices.getUserMedia(constraints);
            videoEl.srcObject = cameraApi.stream;
            return true;
        } catch (err) {
            console.error('Camera access denied or not available:', err);
            return false;
        }
    },

    capturePhoto: (videoEl) => {
        const canvas = document.createElement('canvas');
        canvas.width = videoEl.videoWidth;
        canvas.height = videoEl.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(videoEl, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL('image/jpeg', 0.8);
    },

    closeCamera: () => {
        if (cameraApi.stream) {
            cameraApi.stream.getTracks().forEach(track => track.stop());
            cameraApi.stream = null;
        }
    }
};

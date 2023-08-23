document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("convertButton").addEventListener("click", function() {
        const imageInput = document.getElementById("imageInput");
        const formatSelect = document.getElementById("formatSelect");
        const downloadLink = document.getElementById("downloadLink");

        const selectedFormat = formatSelect.value;
        const selectedFile = imageInput.files[0];
        const convertedFileName = `converted.${selectedFormat}`;

        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = function(e) {
                if (selectedFormat === "pdf") {
                    // Convert to PDF format
                    var pdf = new jsPDF();
                    const imgData = e.target.result;
                    pdf.addImage(imgData, "JPEG", 10, 10, 100, 75);
                    const pdfDataUrl = pdf.output("dataurl");
                    downloadLink.href = pdfDataUrl;
                    downloadLink.download = convertedFileName;
                    downloadLink.style.display = "block";
                } else {
                    // Convert to image format
                    const convertedDataUrl = e.target.result;
                    downloadLink.href = convertedDataUrl;
                    downloadLink.download = convertedFileName;
                    downloadLink.style.display = "block";
                }
            };
            reader.readAsDataURL(selectedFile);
        }
    });
});

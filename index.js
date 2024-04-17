window.jsPDF = window.jspdf.jsPDF;
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
                    const pdf = new pdf();
                    const imgData = e.target.result;

			const imgWidth = 160;
			const imgHeight = imgData.height * (imgWidth / imgData.width);

                    // Set PDF page size and orientation
                    pdf.addImage(imgData, "JPEG", compressionLevel, 20, 20, imgWidth, imgHeight);



                    // Save the PDF
                    const blob = pdf.output("blob");
                    const pdfDataUrl = URL.createObjectURL(blob);
                    downloadLink.href = pdfDataUrl;
                    downloadLink.download = convertedFileName;
                    downloadLink.style.display = "flex";
                } else {
                    // Convert to image format
                    const convertedDataUrl = e.target.result;
                    downloadLink.href = convertedDataUrl;
                    downloadLink.download = convertedFileName;
                    downloadLink.style.display = "flex";
                }
            };
            reader.readAsDataURL(selectedFile);
        }
    });
});

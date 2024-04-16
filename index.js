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

		// Set the compression level (0 = no compression, 1 = maximum compression)
		const compressionLevel = 0.8; // Adjust this value between 0 and 1

// Calculate the image dimensions based on the aspect ratio
const imgWidth = 160;
const imgHeight = imgData.height * (imgWidth / imgData.width);


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

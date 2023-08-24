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
                    const pdf = new jsPDF();
                    const imgData = e.target.result;

                    // Set PDF page size and orientation
                    const options = {
                        format: "JPEG", // You can modify this based on selected format
                        orientation: "portrait",
                        unit: "mm",
                        width: 160,
                        height: 120
                    };
                    pdf.addImage(imgData, options.format, 20, 20, options.width, options.height, undefined, "FAST");

                    // Save the PDF
                    const blob = pdf.output("blob");
                    const pdfDataUrl = URL.createObjectURL(blob);
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

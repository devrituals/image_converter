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
                    pdf.addImage(imgData, "JPEG", 20, 20, 160, 120); // Adjust image placement and dimensions

                    // Save the PDF
                    const blob = pdf.output("blob");
                    const pdfDataUrl = URL.createObjectURL(blob);
                    downloadLink.href = pdfDataUrl;
                    downloadLink.download = convertedFileName;
                    downloadLink.style.display = "flex";
                } else if (selectedFormat === "psd") {
                    async function convertPSDToImage(psdBlob) {
    const psd = await window.PSD.fromDroppedFile(psdBlob);
    const merged = psd.image.toPng();
    const url = URL.createObjectURL(new Blob([merged], { type: 'image/png' }));
                } else if (selectedFormat === "tiff") {
                    async function convertTIFFToImage(tiffBlob) {
    const tiff = await window.Tiff.fromBlob(tiffBlob);
    const canvas = tiff.toCanvas();
                } else if (selectedFormat === "svg") {
                    async function convertSVGToImage(svgString) {
    const canvas = document.createElement('canvas');
    canvg(canvas, svgString);
    const url = canvas.toDataURL('image/png');
                    }
                }
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

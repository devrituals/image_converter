window.jsPDF = window.jspdf.jsPDF;

document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("convertButton").addEventListener("click", async function() {
        const imageInput = document.getElementById("imageInput");
        const formatSelect = document.getElementById("formatSelect");
        const downloadLink = document.getElementById("downloadLink");

        const selectedFormat = formatSelect.value;
        const selectedFile = imageInput.files[0];
        const convertedFileName = `converted.${selectedFormat}`;

        if (selectedFile) {
            const reader = new FileReader();
            reader.onload = async function(e) {
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
                    const psdBlob = await fetch(e.target.result).then(response => response.blob());
                    const psd = await window.PSD.fromDroppedFile(psdBlob);
                    const merged = psd.image.toPng();
                    const url = URL.createObjectURL(new Blob([merged], { type: 'image/png' }));
                    downloadLink.href = url;
                    downloadLink.download = convertedFileName;
                    downloadLink.style.display = "flex";
                } else if (selectedFormat === "tiff") {
                    const tiffBlob = await fetch(e.target.result).then(response => response.blob());
                    const tiff = await window.Tiff.fromBlob(tiffBlob);
                    const canvas = tiff.toCanvas();
                    const url = canvas.toDataURL('image/png');
                    downloadLink.href = url;
                    downloadLink.download = convertedFileName;
                    downloadLink.style.display = "flex";
                } else if (selectedFormat === "svg") {
                    const svgString = e.target.result;
                    const canvas = document.createElement('canvas');
                    canvg(canvas, svgString);
                    const url = canvas.toDataURL('image/png');
                    downloadLink.href = url;
                    downloadLink.download = convertedFileName;
                    downloadLink.style.display = "flex";
                }
            };
            reader.readAsDataURL(selectedFile);
        }
    });
});

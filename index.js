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

                    const img = new Image();
                    img.src = imgData;
                    img.onload = function() {
                        const pdfWidth = pdf.internal.pageSize.getWidth();
                        const pdfHeight = (img.height / img.width) * pdfWidth;

                        pdf.addImage(imgData, "JPEG", 0, 0, pdfWidth, pdfHeight);
                        pdf.save(convertedFileName);
                    };

                    // Save the PDF
                    const blob = pdf.output("blob");
                    const pdfDataUrl = URL.createObjectURL(blob);
                    downloadLink.href = pdfDataUrl;
                    downloadLink.download = convertedFileName;
                    downloadLink.style.display = "flex";
                } 
            };
            reader.readAsDataURL(selectedFile);
        }
    });
});

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

          // Increase the image dimensions for better quality
		const maxWidth = 500; // Adjust this value as needed
            const maxHeight = 500; // Adjust this value as needed
            const imgWidth = Math.min(this.width, maxWidth);
            const imgHeight = (this.height * imgWidth) / this.width;

          // Add the image to the PDF with the desired dimensions
          pdf.addImage(imgData, "JPEG", 20, 20, imgWidth, imgHeight);

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

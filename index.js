window.jsPDF = window.jsPDF = window.jspdf.jsPDF;

document.addEventListener("DOMContentLoaded", function () {
    const imageInput = document.getElementById("imageInput");
    const formatSelect = document.getElementById("formatSelect");
    const convertButton = document.getElementById("convertButton");
    const downloadLink = document.getElementById("downloadLink");
    const imagePreview = document.getElementById("imagePreview");
    const uploadLabel = document.querySelector(".upload-label");
    const loading = document.getElementById("loading");

    // Handle file input change to show preview
    imageInput.addEventListener("change", function () {
        const file = this.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                // Create an image element and set the source
                const img = document.createElement("img");
                img.src = e.target.result;

                // Clear previous preview
                imagePreview.innerHTML = "";
                imagePreview.appendChild(img);

                // Show preview and hide upload text/icon
                imagePreview.style.display = "block";
                uploadLabel.style.display = "none";
            };
            reader.readAsDataURL(file);
        }
    });

    // Handle convert button click
    convertButton.addEventListener("click", function () {
        const selectedFile = imageInput.files[0];
        if (!selectedFile) {
            alert("Please select an image file first.");
            return;
        }

        const selectedFormat = formatSelect.value;
        const convertedFileName = `converted.${selectedFormat}`;

        // Show loading indicator
        loading.style.display = "flex";
        downloadLink.style.display = "none";

        const reader = new FileReader();
        reader.onload = function (e) {
            const img = new Image();
            img.onload = function () {
                if (selectedFormat === "pdf") {
                    // Convert to PDF format
                    const pdf = new jsPDF();
                    const imgData = e.target.result;

                    // Preserve aspect ratio
                    const a4Width = 210; // A4 width in mm
                    const a4Height = 297; // A4 height in mm
                    const margin = 10; // margin in mm
                    const maxWidth = a4Width - margin * 2;
                    const maxHeight = a4Height - margin * 2;

                    let imgWidth = img.width;
                    let imgHeight = img.height;
                    let ratio = imgWidth / imgHeight;

                    if (imgWidth > maxWidth) {
                        imgWidth = maxWidth;
                        imgHeight = imgWidth / ratio;
                    }

                    if (imgHeight > maxHeight) {
                        imgHeight = maxHeight;
                        imgWidth = imgHeight * ratio;
                    }

                    const x = (a4Width - imgWidth) / 2;
                    const y = (a4Height - imgHeight) / 2;

                    pdf.addImage(imgData, "JPEG", x, y, imgWidth, imgHeight);

                    // Save the PDF
                    const blob = pdf.output("blob");
                    const pdfDataUrl = URL.createObjectURL(blob);
                    downloadLink.href = pdfDataUrl;
                    downloadLink.download = convertedFileName;
                    downloadLink.style.display = "inline-block";
                    loading.style.display = "none";
                } else if (selectedFormat === "bmp") {
                    const canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0);
                    CanvasToBMP.toDataURL(canvas, function (dataUrl) {
                        downloadLink.href = dataUrl;
                        downloadLink.download = convertedFileName;
                        downloadLink.style.display = "inline-block";
                        loading.style.display = "none";
                    });
                } else {
                    // Convert to other image formats
                    const canvas = document.createElement("canvas");
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext("2d");
                    ctx.drawImage(img, 0, 0);
                    const dataUrl = canvas.toDataURL(`image/${selectedFormat}`);

                    downloadLink.href = dataUrl;
                    downloadLink.download = convertedFileName;
                    downloadLink.style.display = "inline-block";
                    loading.style.display = "none";
                }
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(selectedFile);
    });
});
using Microsoft.AspNetCore.Http;

namespace CVManager.Services.Interfaces
{
    public interface IFileService
    {
        string ReadTextFromPdfFile(IFormFile pdfFile);
        bool SaveFileToDirectory(string filePath, IFormFile file);
    }
}

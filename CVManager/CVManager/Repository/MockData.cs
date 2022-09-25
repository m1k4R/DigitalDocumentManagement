using CVManager.ElasticIndex;
using Nest;
using System;
using System.Collections.Generic;

namespace CVManager.Repository
{
    public static class MockData
    {
        public static List<Application> GetTestData()
        {
            List<Application> unit = new List<Application>();

            unit.Add(new Application
            {
                Id = Guid.NewGuid(),
                ApplicantFirstname = "Đorđe",
                ApplicantLastname = "Petrović",
                ApplicantEmail = "đoko@gmail.com",
                ApplicantPhone = "003812232780",
                ApplicantEducationLevel = 3,
                CvContent = @"Đorđe Petrović\nemail: đoko@gmail.com\ntel: 003812232780\ngrad: Beograd\njunior frontend developer 2 god\n1",
                CoverLetterContent = @"Zovem se Đorđe Petrović, radim kao frontend developer, trenutno sam početni medior i želim postati team lead. Koristim Javu i React.js",
                CvFileName = "ĐorđePetrovićCV.pdf",
                CoverLetterFileName = "ĐorđePetrovićLetter.pdf",
                LatLongLocation = new GeoLocation(44.787197, 20.457273),
                DateCreated = DateTime.UtcNow
            });

            unit.Add(new Application
            {
                Id = Guid.NewGuid(),
                ApplicantFirstname = "Ања",
                ApplicantLastname = "Савић",
                ApplicantEmail = "anja@gmail.com",
                ApplicantPhone = "003813455467",
                ApplicantEducationLevel = 4,
                CoverLetterContent = @"Ја сам Ања Савић, завршила сам програмирање на ФТН, тренутно сам у потрази за послом.Веома сам комуникативна и волим тимски рад.",
                CvContent = @"Ања Савић\nemail: anja@gmail.com\ntel: 003813455467\n1",
                CvFileName = "АњаСавићЦВ.pdf",
                CoverLetterFileName = "АњаСавићПисмо.pdf",
                LatLongLocation = new GeoLocation(43.891414, 20.350165),
                DateCreated = DateTime.UtcNow
            });


            return unit;

        }
    }
}

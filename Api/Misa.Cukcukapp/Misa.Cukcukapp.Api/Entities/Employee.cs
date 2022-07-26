using Misa.Cukcukapp.Api.Enums;
using System.ComponentModel.DataAnnotations;

namespace Misa.Cukcukapp.Api.Entities
{
    /// <summary>
    /// Nhân viên
    /// </summary>
    public class Employee
    {
        /// <summary>
        /// ID nhân viên
        /// </summary>
        public Guid? EmployeeID { get; set; }

        /// <summary>
        /// Mã nhân viên
        /// </summary>
        [Required(ErrorMessage = "e004")]
        public string? EmployeeCode { get; set; }

        /// <summary>
        /// Tên nhân viên
        /// </summary>
        [Required(ErrorMessage = "e005")]
        public string? EmployeeName { get; set; }

        /// <summary>
        /// Giới tính nhân viên
        /// </summary>
        public Gender? Gender { get; set; }

        /// <summary>
        /// Số điện thoại nhân viên
        /// </summary>
        [Required(ErrorMessage = "e008")]
        public string? PhoneNumber { get; set; }

        /// <summary>
        /// Ngày sinh của nhân viên
        /// </summary>
        public DateTime? DateOfBirth { get; set; }

        /// <summary>
        /// Email của nhân viên
        /// </summary>
        [Required(ErrorMessage = "e007")]
        [EmailAddress(ErrorMessage = "e009")]
        public string? Email { get; set; }

        /// <summary>
        /// Lương cơ bản 
        /// </summary>
        public double Salary { get; set; }

        /// <summary>
        /// ID Phòng ban
        /// </summary>
        public Guid? DepartmentID { get; set; }

        /// <summary>
        /// Tên phòng ban
        /// </summary>
        public string? DepartmentName { get; set; }

        /// <summary>
        /// ID vị trí
        /// </summary>
        public Guid? PositionID { get; set; }

        /// <summary>
        /// Tên vị trí
        /// </summary>
        public string? PositionName { get; set; }

        /// <summary>
        /// Tình trạng công việc
        /// </summary>
        public WorkStatus WorkStatus { get; set; }

        /// <summary>
        /// Số chứng minh nhân dân
        /// </summary>
        [Required(ErrorMessage = "e006")]
        public string IdentifyNumber { get; set; }

        /// <summary>
        /// Ngày cấp CMND
        /// </summary>
        public DateTime? IdentifyIssuedDate { get; set; }

        /// <summary>
        /// Nơi cấp CMND
        /// </summary>
        public string IdentifyIssuedPlace { get; set; }

        /// <summary>
        /// Mã số thuế
        /// </summary>
        public string TaxCode { get; set; }

        /// <summary>
        /// Ngày gia nhập công ty
        /// </summary>
        public DateTime JoinDate { get; set; }

        /// <summary>
        /// Ngày tạo hồ sơ
        /// </summary>
        public DateTime CreatedDate { get; set; }

        /// <summary>
        /// Người tạo hồ sơ
        /// </summary>
        public string CreatedBy { get; set; }

        /// <summary>
        /// Ngày sửa hồ sơ
        /// </summary>
        public DateTime ModifiedDate { get; set; }

        /// <summary>
        /// Người sửa hồ sơ
        /// </summary>
        public string ModifiedBy { get; set; }

        /// <summary>
        /// Đường dẫn ảnh
        /// </summary>
        public string? Image { get; set; }
    }
}

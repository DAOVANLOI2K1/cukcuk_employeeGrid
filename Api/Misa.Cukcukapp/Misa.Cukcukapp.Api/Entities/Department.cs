namespace Misa.Cukcukapp.Api.Entities
{
    public class Department
    {
        /// <summary>
        /// ID của phòng ban
        /// </summary>
        public Guid? DepartmentID { get; set; }

        /// <summary>
        /// Mã phòng ban
        /// </summary>
        public String? DepartmentCode { get; set; }

        /// <summary>
        /// Tên phòng ban
        /// </summary>
        public String? DepartmentName { get; set; }

        /// <summary>
        /// Ngày tạo phòng ban
        /// </summary>
        public DateTime? CreatedDate { get; set; }

        /// <summary>
        /// Người tạo phòng ban
        /// </summary>
        public string? CreatedBy { get; set; }

        /// <summary>
        /// Ngày sửa phòng ban
        /// </summary>
        public DateTime? ModifiedDate { get; set; }

        /// <summary>
        /// Người sửa phòng ban
        /// </summary>
        public string? ModifiedBy { get; set; }
    }
}

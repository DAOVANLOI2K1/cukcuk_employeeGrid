namespace Misa.Cukcukapp.Api.Entities
{
    /// <summary>
    /// Đối tượng vị trí trong công ty
    /// </summary>
    public class Position
    {
        /// <summary>
        /// ID của vị trí
        /// </summary>
        public Guid? PositionID { get; set; }

        /// <summary>
        /// Mã vị trí
        /// </summary>
        public String? PositionCode { get; set; }

        /// <summary>
        /// Tên vị trí
        /// </summary>
        public String? PositionName { get; set; }

        /// <summary>
        /// Ngày tạo vị trí
        /// </summary>
        public DateTime? CreatedDate { get; set; }

        /// <summary>
        /// Người tạo vị trí
        /// </summary>
        public string? CreatedBy { get; set; }

        /// <summary>
        /// Ngày sửa vị trí
        /// </summary>
        public DateTime? ModifiedDate { get; set; }

        /// <summary>
        /// Người sửa vị trí
        /// </summary>
        public string? ModifiedBy { get; set; }
    }
}

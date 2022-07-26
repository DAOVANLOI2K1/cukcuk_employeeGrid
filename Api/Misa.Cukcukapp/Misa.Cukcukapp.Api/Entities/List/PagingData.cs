namespace Misa.Cukcukapp.Api.Entities.List
{
    /// <summary>
    /// Dư liệu trả về khi đọc DB
    /// </summary>
    /// <typeparam name="T">Kiểu dữ liệu trả về</typeparam>
    public class PagingData<T>
    {
        /// <summary>
        /// Mảng đối tượng
        /// </summary>
        public List<T> Data { get; set; } = new List<T>();

        /// <summary>
        /// Tổng số bản ghi 
        /// </summary>
        public long TotalCount { get; set; }
    }
}

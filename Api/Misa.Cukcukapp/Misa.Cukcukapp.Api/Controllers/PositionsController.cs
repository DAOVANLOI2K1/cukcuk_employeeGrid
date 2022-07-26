using Dapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Misa.Cukcukapp.Api.Entities;
using Misa.Cukcukapp.Api.Entities.List;
using MySqlConnector;
using Swashbuckle.AspNetCore.Annotations;

namespace Misa.Cukcukapp.Api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class PositionsController : ControllerBase
    {
        /// <summary>
        /// Api lấy thông tin tất cả vị trí
        /// </summary>
        /// <returns>Danh sách vị trí và tổng số lượng</returns>
        [HttpGet]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(PagingData<Position>))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult GetPositions()
        {
            try
            {
                // Khởi tạo kết nối đến DB
                string connectionString = "Server=localhost;Port=3306;Database=datacukcukpage;Uid=root;Pwd=root;";
                var mysqlConnection = new MySqlConnection(connectionString);

                // Chuẩn bị tên Procedure
                string getPositionProc = "GetPositions";

                // Thực hiện Procedure
                var getPositions = mysqlConnection.QueryMultiple(getPositionProc, commandType: System.Data.CommandType.StoredProcedure);

                // Xử lí kết quả trả về DB
                if (getPositions != null)
                {
                    var positions = getPositions.Read<Position>();
                    var totalCount = getPositions.Read<long>().Single();
                    return StatusCode(StatusCodes.Status200OK, new PagingData<Position>
                    {
                        Data = positions.ToList(),
                        TotalCount = totalCount
                    });
                }
                return StatusCode(StatusCodes.Status400BadRequest, "e002");
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status400BadRequest, "e001");
            }
        }
    }
}

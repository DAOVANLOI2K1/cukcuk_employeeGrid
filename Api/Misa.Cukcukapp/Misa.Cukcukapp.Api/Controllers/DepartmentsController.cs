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
    public class DepartmentsController : ControllerBase
    {
        /// <summary>
        /// Api lấy thông tin tất cả phòng ban
        /// </summary>
        /// <returns>Danh sách phòng ban và tổng số lượng</returns>
        [HttpGet]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(PagingData<Department>))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult GetDepartments()
        {
            try
            {
                // Khởi tạo kết nối đến DB
                string connectionString = "Server=localhost;Port=3306;Database=datacukcukpage;Uid=root;Pwd=root;";
                var mysqlConnection = new MySqlConnection(connectionString);

                // Chuẩn bị tên Procedure
                string getDepartmentProc = "GetDepartments";

                // Thực hiện Procedure
                var getDepartments = mysqlConnection.QueryMultiple(getDepartmentProc, commandType: System.Data.CommandType.StoredProcedure);

                // Xử lí kết quả trả về DB
                if (getDepartments != null)
                {
                    var departments = getDepartments.Read<Department>();
                    var totalCount = getDepartments.Read<long>().Single();
                    return StatusCode(StatusCodes.Status200OK, new PagingData<Department>
                    {
                        Data = departments.ToList(),
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

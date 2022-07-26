using Dapper;
using Microsoft.AspNetCore.Mvc;
using Misa.Cukcukapp.Api.Entities;
using Misa.Cukcukapp.Api.Entities.List;
using MySqlConnector;
using Swashbuckle.AspNetCore.Annotations;

namespace Misa.Cukcukapp.Api.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        /// <summary>
        /// Api thêm mới 1 nhân viên
        /// </summary>
        /// <param name="employee"></param>
        /// <returns>Nhân viên được thêm mới</returns>
        [HttpPost]
        [SwaggerResponse(StatusCodes.Status201Created, type: typeof(Guid))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult InsertEmployee([FromBody] Employee employee)
        {
            try
            {
                // Khởi tạo kết nối đến DB SQL
                string connectionString = "Server=localhost;Port=3306;Database=datacukcukpage;Uid=root;Pwd=root;";
                var mysqlConnection = new MySqlConnection(connectionString);

                // Chuẩn bị câu lệnh INSERT INTO
                String insertQuery = "INSERT INTO employee (EmployeeID, EmployeeCode, EmployeeName, Gender, PhoneNumber, DateOfBirth, Email, Salary, DepartmentID, PositionID, WorkStatus, IdentifyNumber, IdentifyIssuedDate, IdentifyIssuedPlace, TaxCode, JoinDate, CreatedDate, CreatedBy, ModifiedDate, ModifiedBy, Image) " +
                                "VALUES(@EmployeeID, @EmployeeCode, @EmployeeName, @Gender, @PhoneNumber, @DateOfBirth, @Email, @Salary, @DepartmentID, @PositionID, @WorkStatus, @IdentifyNumber, @IdentifyIssuedDate, @IdentifyIssuedPlace, @TaxCode, @JoinDate, @CreatedDate, @CreatedBy, @ModifiedDate, @ModifiedBy, @Image);";

                // Chuẩn bị tham số đầu vào cho câu lệnh INSERT INTO
                Guid EmployeeID = Guid.NewGuid();
                var parameters = new DynamicParameters();
                parameters.Add("@EmployeeID", EmployeeID);
                parameters.Add("@EmployeeCode", employee.EmployeeCode);
                parameters.Add("@EmployeeName", employee.EmployeeName);
                parameters.Add("@Gender", employee.Gender);
                parameters.Add("@PhoneNumber", employee.PhoneNumber);
                parameters.Add("@DateOfBirth", employee.DateOfBirth);
                parameters.Add("@Email", employee.Email);
                parameters.Add("@Salary", employee.Salary);
                parameters.Add("@DepartmentID", employee.DepartmentID);
                parameters.Add("@PositionID", employee.PositionID);
                parameters.Add("@WorkStatus", employee.WorkStatus);
                parameters.Add("@IdentifyNumber", employee.IdentifyNumber);
                parameters.Add("@IdentifyIssuedDate", employee.IdentifyIssuedDate);
                parameters.Add("@IdentifyIssuedPlace", employee.IdentifyIssuedPlace);
                parameters.Add("@TaxCode", employee.TaxCode);
                parameters.Add("@JoinDate", employee.JoinDate);
                parameters.Add("@CreatedDate", DateTime.Now);
                parameters.Add("@CreatedBy", employee.CreatedBy);
                parameters.Add("@ModifiedDate", DateTime.Now);
                parameters.Add("@ModifiedBy", employee.ModifiedBy);
                parameters.Add("@Image", employee.Image);

                // Thực hiện gọi vào DB để chạy câu lệnh INSERT INTO với tham số đầu vào ở trên
                var implementInsertDB = mysqlConnection.Execute(insertQuery, parameters);

                // Xử lý kết quả trả về từ DB
                if (implementInsertDB > 0)
                {
                    // Trả về dữ liệu cho client
                    return StatusCode(StatusCodes.Status201Created, EmployeeID);
                }

                return StatusCode(StatusCodes.Status400BadRequest, "e002");
            }
            catch (MySqlException mysqlExeption)
            {
                if (mysqlExeption.ErrorCode == MySqlErrorCode.DuplicateKeyEntry)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, "e003");
                }
                return StatusCode(StatusCodes.Status400BadRequest, "e001");
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status400BadRequest, "e001");
            }
        }

        /// <summary>
        /// Api sửa thông tin 1 nhân viên
        /// </summary>
        /// <param name="employeeID"></param>
        /// <param name="employee"></param>
        /// <returns>employeeID vừa sửa</returns>
        [HttpPut("{employeeID}")]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(Guid))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult UpdateEmployee([FromRoute] Guid employeeID, [FromBody] Employee employee)
        {
            try
            {
                // Khởi tạo kết nối đến DB
                string connectionString = "Server=localhost;Port=3306;Database=datacukcukpage;Uid=root;Pwd=root;";
                var mysqlConnection = new MySqlConnection(connectionString);

                // Chuẩn bị query để gọi vào DB
                string updateQuery = "UPDATE employee SET " +
                    "EmployeeCode = @EmployeeCode, " +
                    "EmployeeName = @EmployeeName, " +
                    "Gender = @Gender, " +
                    "PhoneNumber = @PhoneNumber, " +
                    "DateOfBirth = @DateOfBirth, " +
                    "Email = @Email, " +
                    "Salary = @Salary, " +
                    "DepartmentID = @DepartmentID, " +
                    "PositionID = @PositionID, " +
                    "WorkStatus = @WorkStatus, " +
                    "IdentifyNumber = @IdentifyNumber, " +
                    "IdentifyIssuedDate = @IdentifyIssuedDate, " +
                    "IdentifyIssuedPlace = @IdentifyIssuedPlace, " +
                    "TaxCode = @TaxCode, " +
                    "CreatedBy = @CreatedBy, " +
                    "ModifiedDate = @ModifiedDate, " +
                    "ModifiedBy = @ModifiedBy, " +
                    "Image = @Image " +
                    "WHERE EmployeeID = @EmployeeID; ";

                // Chuẩn bị tham số đầu vào cho lệnh update
                var parameters = new DynamicParameters();
                parameters.Add("@EmployeeID", employeeID);
                parameters.Add("@EmployeeCode", employee.EmployeeCode);
                parameters.Add("@EmployeeName", employee.EmployeeName);
                parameters.Add("@Gender", employee.Gender);
                parameters.Add("@PhoneNumber", employee.PhoneNumber);
                parameters.Add("@DateOfBirth", employee.DateOfBirth);
                parameters.Add("@Email", employee.Email);
                parameters.Add("@Salary", employee.Salary);
                parameters.Add("@DepartmentID", employee.DepartmentID);
                parameters.Add("@PositionID", employee.PositionID);
                parameters.Add("@WorkStatus", employee.WorkStatus);
                parameters.Add("@IdentifyNumber", employee.IdentifyNumber);
                parameters.Add("@IdentifyIssuedDate", employee.IdentifyIssuedDate);
                parameters.Add("@IdentifyIssuedPlace", employee.IdentifyIssuedPlace);
                parameters.Add("@TaxCode", employee.TaxCode);
                parameters.Add("@CreatedBy", employee.CreatedBy);
                parameters.Add("@ModifiedDate", DateTime.Now);
                parameters.Add("@ModifiedBy", employee.ModifiedBy);
                parameters.Add("@Image", employee.Image);

                // Thực hiện câu lệnh update vào db
                var implementUpdateEmployee = mysqlConnection.Execute(updateQuery, parameters);

                // Xử lý kết quả trả về DB
                if (implementUpdateEmployee > 0)
                {
                    // Trả về kết quả cho client
                    return StatusCode(StatusCodes.Status200OK, employeeID);
                }
                return StatusCode(StatusCodes.Status400BadRequest, "e002");
            }
            catch (MySqlException mysqlExeption)
            {
                if (mysqlExeption.ErrorCode == MySqlErrorCode.DuplicateKeyEntry)
                {
                    return StatusCode(StatusCodes.Status400BadRequest, "e003");
                }
                return StatusCode(StatusCodes.Status400BadRequest, "e001");
            }
            catch (Exception ex)
            {

                return StatusCode(StatusCodes.Status400BadRequest, "e001");
            }
        }

        /// <summary>
        /// Api xóa một nhân viên theo ID
        /// </summary>
        /// <param name="EmployeeID"></param>
        /// <returns>ID của nhân viên vừa xóa</returns>
        [HttpDelete("{EmployeeID}")]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(Guid))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult DeleteEmployee([FromRoute] Guid EmployeeID)
        {
            try
            {
                // Khởi tạo kết nối với DB
                string connectionString = "Server=localhost;Port=3306;Database=datacukcukpage;Uid=root;Pwd=root;";
                MySqlConnection mySqlConnection = new MySqlConnection(connectionString);

                // Chuẩn bị query delete
                string deleteQuery = "DELETE FROM employee WHERE EmployeeID = @EmployeeID";

                // Chuẩn bị đầu vào cho lệnh delete
                DynamicParameters parameters = new DynamicParameters();
                parameters.Add("@EmployeeID", EmployeeID);

                // Thực hiện câu lệnh delete
                var implementDeleteEmployee = mySqlConnection.Execute(deleteQuery, parameters);

                // Xử lý kết quả trả về DB
                if (implementDeleteEmployee > 0)
                {
                    return StatusCode(StatusCodes.Status200OK, EmployeeID);
                }
                return StatusCode(StatusCodes.Status400BadRequest, "e002");
            }
            catch (Exception e)
            {
                return StatusCode(StatusCodes.Status400BadRequest, "e001");
            }
            
        }

        /// <summary>
        /// Api lấy thông tin nhân viên theo ID
        /// </summary>
        /// <param name="EmployeeID"></param>
        /// <returns>ID của nhân viên được tìm thấy</returns>
        [HttpGet("{EmployeeID}")]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(Employee))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult GetEmployeeByID([FromRoute] Guid EmployeeID)
        {
            try
            {
                // Khởi tạo kết nối đến DB
                string connectionString = "Server=localhost;Port=3306;Database=datacukcukpage;Uid=root;Pwd=root;";
                var mySqlConnection = new MySqlConnection(connectionString);

                // Chuẩn bị tên Procedure
                string Proc_getByID = "GetEmployeeByID";

                // Chuẩn bị tham số đầu vào cho procedure
                var parameters = new DynamicParameters();
                parameters.Add("@EmployeeID", EmployeeID);

                // Thực hiện Procedure trong DB
                var EmployeeResult = mySqlConnection.QueryMultiple(Proc_getByID, parameters, commandType: System.Data.CommandType.StoredProcedure);

                // Xử lý kết quả trả về DB
                if (EmployeeResult != null)
                {
                    var employee = EmployeeResult.Read<Employee>();
                    return StatusCode(StatusCodes.Status200OK, employee);
                }
                return StatusCode(StatusCodes.Status400BadRequest, "e002");
            }
            catch (Exception ex)
            {
                return StatusCode(StatusCodes.Status400BadRequest, "e001");
            }
        }

        /// <summary>
        /// Api phân trang page grid
        /// </summary>
        /// <param name="PositionID"></param>
        /// <param name="DepartmentID"></param>
        /// <param name="pageNumber"></param>
        /// <param name="pageSize"></param>
        /// <returns>Danh sách employee</returns>
        /// 
        [HttpGet]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(PagingData<Employee>))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult FilterEmployee([FromQuery] string? search, [FromQuery] string? PositionID, [FromQuery] string? DepartmentID, [FromQuery] int pageNumber, [FromQuery] int pageSize)
        {
            try
            {
                // Khởi tạo kết nối với DB
                string connectionString = "Server=localhost;Port=3306;Database=datacukcukpage;Uid=root;Pwd=root;";
                var mysqlConnection = new MySqlConnection(connectionString);

                // Chuẩn bị tên procedure gọi vào DB
                string procName = "GetEmployeesPaging";

                // Chuẩn bị tham số đầu vào cho procedure
                var parameters = new DynamicParameters();
                parameters.Add("@$skip", pageNumber * pageSize);
                parameters.Add("@$take", pageSize);
                parameters.Add("@$sort", "");

                var whereList = new List<string>();
                if (PositionID != null)
                {
                    whereList.Add($"PositionID = '{PositionID}'");
                }
                if (DepartmentID != null)
                {
                    whereList.Add($"DepartmentID = '{DepartmentID}'");
                }
                if(search != null)
                {
                    whereList.Add($"EmployeeCode LIKE \'%{search}%\' OR EmployeeName LIKE \'%{search}%\' OR PhoneNumber LIKE \'%{search}%\'");
                }
                string whereText = "";
                if (whereList != null)
                {
                    whereText = string.Join(" AND ", whereList);
                }
                parameters.Add("@$where", whereText);

                // Thực thi procedure
                var proc_Results = mysqlConnection.QueryMultiple(procName, parameters, commandType: System.Data.CommandType.StoredProcedure);

                // Xử lý kết quả trả về DB
                if (proc_Results != null)
                {
                    var employees = proc_Results.Read<Employee>();
                    var totalCount = proc_Results.Read<long>().Single();
                    return StatusCode(StatusCodes.Status200OK, new PagingData<Employee>
                    {
                        Data = employees.ToList(),
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

        [HttpGet("new-code")]
        [SwaggerResponse(StatusCodes.Status200OK, type: typeof(string))]
        [SwaggerResponse(StatusCodes.Status400BadRequest)]
        [SwaggerResponse(StatusCodes.Status500InternalServerError)]
        public IActionResult GetNewEmployeeCode()
        {
            // Khởi tạo kết nối đến DB
            string connectionString = "Server=localhost;Port=3306;Database=datacukcukpage;Uid=root;Pwd=root;";
            var mysqlConnection = new MySqlConnection(connectionString);

            // Chuẩn bị tên function
            string Frocedure = "GetNewCode";

            // Thực thi function
            var result = mysqlConnection.QueryFirstOrDefault(Frocedure, commandType: System.Data.CommandType.StoredProcedure);
            if(result != null)
            {
                return StatusCode(StatusCodes.Status200OK, result);
            }
            return StatusCode(StatusCodes.Status400BadRequest, "e002");
        }
    }
}

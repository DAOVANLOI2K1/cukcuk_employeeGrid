class EmployeePage {
    constructor (gridID, collabID, pageLeftID) {
        let me = this;

        me.Url = "http://localhost:5048/api/v1/Employees";
        me.Url1 = "http://localhost:5048/api/v1/Departments";
        me.Url2 = "http://localhost:5048/api/v1/Positions";

        // Khởi tạo thuộc tính chỉ đến element chứa grid employee
        me.grid = $(`#${gridID}`);

        // Khởi tạo biến chỉ đến element chứa phân trang
        me.count_show = $(`#${collabID}`);

        // Khởi tạo biến chỉ đến page left
        me.pageLeft = $(`#${pageLeftID}`);

        // Gọi đến màn hình Form
        me.formpage = new FormNewEmployee("FormID");

        // Khởi tạo biến chưa column config
        me.columnCofig = me.getColumnConfig();

        // Khởi tạo sự kiện
        me.initEvent();

        // Lấy dữ liệu page 1
        me.getData();

         // Gọi hàm get data department và position
         me.getDataOptions();
    }


    // Hàm chứa sự kiện
    initEvent() {
        let me = this;

        // gọi sự kiện toolbar
        me.initEventToolbar();

        // gọi sự kiện table
        me.initEventTable();

        // gọi sự kiện page left
        me.initEventPageLeft();

        // Gọi sự kiện paging trang
        me.initEventPaging();
    }

    // Hàm sự kiện toolbar
    initEventToolbar() {
        let me = this,
            toolbarID = me.grid.attr("Toolbar");

            $(`#${toolbarID} [commandType]`).off("click");
            $(`#${toolbarID} [commandType]`).on("click", function() {
                let CommandType = $(this).attr("commandType");

                if(me[CommandType] && typeof me[CommandType] == "function")
                 {
                    me[CommandType]();
                 }
            });
    }

    // Hàm thêm mới nhân viên
    add() {
        let me = this,
            param = {
                parents: me,
                formMode: resources.CommandType.Add
            };
        
        if(me.formpage) {
            me.formpage.open(param);
            me.formpage.initEventToolbar(param);
        }
    }

    // Hàm sửa nhân viên
    update() {
        let me = this,
            EmployeeID = me.grid.find("tr.active td")[0].innerText;

        let data = CommonFn.Ajax(me.Url + "/" + EmployeeID, resources.Method.Get, {}, function(response) {
            if(response) {
                let param = {
                    parents: me,
                    formMode: resources.CommandType.Update,
                    data: response[0]
                };
                if(me.formpage) {
                    me.formpage.open(param);
                    me.formpage.initEventToolbar(param, EmployeeID);
                }
            }
            else {
                console.error("Có lỗi trong quá trình lấy dữ liệu!");
            }
        });
    }

    // Hàm xóa nhân viên
    delete() {
        let me = this,
            activeRow = me.getActiveRow(),
            activeID = $(me.getActiveRow().find("td")[0]).text();

        activeRow.remove();
        CommonFn.Ajax(me.Url + '/' + activeID, resources.Method.Delete, {}, function(response) {
            if(response) {
                alert("Xóa thành công!");
            }
            else {
                alert("Fail!");
            }
        });
    }

    // Hàm lấy dữ liệu của hàng được chọn trong bảng
    getActiveRow() {
        let me = this;

        return me.grid.find("tbody tr.active");
    }

    // Hàm khởi tạo sự kiện table
    initEventTable() {
        let me = this;

        me.grid.off("click", "tr");
        me.grid.on("click", "tr", function() {
            $(this).toggleClass("active");
        });
    }

    // Hàm khởi tạo sự kiện page left
    initEventPageLeft() {
        let me = this;

        me.pageLeft.find(".option_menu").off("click");
        me.pageLeft.find(".option_menu").on("click", function() {
            me.pageLeft.find(".option_menu").removeClass("focus");

            $(this).addClass("focus");
        });
    }

    // Hàm khởi tạo sự kiện chuyển trang
    initEventPaging() {
        let me = this;

        me.count_show.find(".pagging_number").off("click");
        me.count_show.find(".pagging_number").on("click", function() {
            me.count_show.find(".pagging_number").removeClass("active");

            $(this).addClass("active");
            // Lấy dữ liệu pagging
            me.getData();
        });
    }

    // Hàm lấy dữ liệu
    getData() {

        let me = this,
            pageSize = "200",
            pageNumber = me.count_show.find(".pagging_number.active").val(),
            show_option = $(`${me.grid.attr("Show_option")}`);
            departmentID = me.getDepartmentID(show_option);
            positionID = me.getPositionID(show_option);


        let data = CommonFn.Ajax(me.Url + "?pageSize=" + pageSize + "&pageNumber=" + pageNumber + "&", 
        resources.Method.Get, {}, function(response) {
            if(response) {
                me.loadData(response);
            }
            else {
                console.error("Có lỗi trong quá trình lấy dữ liệu!");
            }
        });
    }

    // Hàm lấy ID phòng ban để lọc grid
    getDepartmentID(control) {
        let me = this,
            department_option = $(`${control}`).find("[option_Name = \"Department\"]");
        
        return department_option.val();
    }

    // Hàm lấy ID vị trí để lọc grid
    getPositionID(control) {
        let me = this,
            position_option = $(`${control}`).find("[option_Name = \"Position\"]");
        
        return position_option.val();
    }

    // Hàm lấy dữ liệu phòng ban và vị trí
    getDataOptions() {
        let me = this;
        
        let DepartmentData = CommonFn.Ajax(me.Url1, resources.Method.Get, {}, function(response) {
            if(response) {
                // Gọi đến hàm loadData input phòng ban trong form
                me.loadDataDepartment(response);
            }
            else {
                console.error("Có lỗi xảy ra trong quá trình lấy dữ liệu!");
            }
        });
        let PositionData = CommonFn.Ajax(me.Url2, resources.Method.Get, {}, function(response) {
            if(response) {
                // Gọi đến hàm loadData input vị trí trong form
                me.loadDataPosition(response);
            }
            else {
                console.error("Có lỗi xảy ra trong quá trình lấy dữ liệu!");
            }
        });
    }

    // Hàm load dữ liệu phòng ban
    loadDataDepartment(data) {
        let me = this;

        if(data) {
            // Gọi đến hàm render phòng ban trong form
            me.formpage.renderDepartmentForm(data);

            // Gọi đến hàm render phòng ban employeePage
            me.renderDepartmentPage(data);
        }
    }

    // Hàm load dữ liệu vị trí
    loadDataPosition(data) {
        let me = this;

        if(data) {
            // Gọi đến hàm render vị trí trong form
            me.formpage.renderPositionForm(data);

            // Gọi đến hàm render vị trí employeePage
            me.renderPositionPage(data);
        }
    }

    // Hàm render phòng ban employeePage
    renderDepartmentPage(data) {
        let me = this,
            show_optionID = me.grid.attr("Show_option"),
            option_Department = $(`#${show_optionID}`).find("[option_Name = \"Department\"]"),
            option = $("<option></option>");
            
        option_Department.empty();
        option.val("all");
        option.text("Tất cả phòng ban");
        option_Department.append(option);

        data.data.filter(function(item) {
            let option = $("<option></option>");

            option.val(item.departmentID);
            option.text(item.departmentName);

            option_Department.append(option);
        });
    }

    // Hàm render vị trí employeePage
    renderPositionPage(data) {
        let me = this,
            show_optionID = me.grid.attr("Show_option"),
            option_Position = $(`#${show_optionID}`).find("[option_Name = \"Position\"]"),
            option = $("<option></option>");

        option_Position.empty();
        option.val("all");
        option.text("Tất cả vị trí");
        option_Position.append(option);

        data.data.filter(function(item) {
            let option = $("<option></option>");

            option.val(item.positionID);
            option.text(item.positionName);

            option_Position.append(option);
        });
    }


    // Hàm lấy khung column
    getColumnConfig() {
        let me = this,
            columnDefault = {
                FieldName: "",
                DataType: "string",
                Text: ""
            },
            columns = [];

        me.grid.find(".col").each(function() {
            let column = {...columnDefault},
                that = $(this);

            Object.keys(columnDefault).filter(function(colName) {
                let value = that.attr(colName);

                if(value) {
                    column[colName] = value;
                }

                column.Text = that.text();
            });
            columns.push(column);
        });
        return columns;
    }

    // Hàm load dữ liệu
    loadData(data) {
        let me= this;

        if(data) {
            me.renderData(data);
        }
    }

    // Hàm đưa dữ liệu lên trang
    renderData(data) {
        let me = this,
            table = $("<table></table>"),
            tr_th = me.renderthead(),
            tr_td = me.rendertbody(data);
        
        table.append(tr_th);
        table.append(tr_td);

        me.grid.html(table);
    }

    // Hàm render tr chứa th
    renderthead() {
        let me = this,
            tr = $("<tr></tr>"),
            thead = $("<thead></thead>");
        
        me.columnCofig.filter(function(column) {
            let text = column.Text,
                dataType = column.DataType,
                th = $("<th></th>");
            
            me.hideID(th, dataType);
            th.text(text);

            tr.append(th);
        });
        thead.append(tr)
        return thead;
    }

    // Hàm render tr chứa td
    rendertbody(data) {
        let me = this,
            tbody = $("<tbody></tbody>"),
            count = 0;
        
        if(data) {
            data.data.filter(function(item) {
                let tr = $("<tr></tr>");

                me.columnCofig.filter(function(column) {
                    let td = $("<td></td>"),
                        fieldName = column.FieldName,
                        dataType = column.DataType,
                        value = me.getValueCell(item, fieldName, dataType);

                    me.hideID(td, dataType);
                    td.text(value);
                    
                    tr.append(td);
                });
                tbody.append(tr);
                count++;
            });
            // gridBody.html(tbody);
        }
        me.showCountEmployee(data, count);
        return tbody;
    }
    
    // Hàm lấy dữ liệu của từng cell
    getValueCell(item, fieldName, dataType) {
        let me = this,
            value = item[fieldName];

        // Format lại data theo dataType
        if(value || value == 0) {
            switch(dataType) {
                case resources.dataType.Enum:
                    value = resources[fieldName][value];
                    break;
                case resources.dataType.Date:
                    value = CommonFn.formatDate(value);
                    break;
                case resources.dataType.Money:
                    value = CommonFn.formatMoney(value);
                    break;
            }
        }
        return value;
    }

    // Hàm add class cell
    hideID(target, dataType) {
        if(dataType) {
            switch(dataType) {
                case resources.dataType.Guid:
                    target.hide();
                    break;
            }
        }
    }

    // Hàm show số lượng employee
    showCountEmployee(data, count_Record) {
        let me = this,
            sum = data.totalCount;

        me.count_show.find(".count_datatable")[0].innerText = `01-${count_Record}/${sum}`;
        me.count_show.find(".count_datatable")[1].innerText = `${count_Record} lao động/trang`;
    }
}
// Gọi class để thực thi
var employeePage = new EmployeePage("employeegrid", "colab_table", "employeePage_left");
class EmployeePage {
    constructor (gridID, collabID, pageLeftID) {
        let me = this;

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

        // Lấy dữ liệu
        me.loadData();
    }


    // Hàm chứa sự kiện
    initEvent() {
        let me = this;

        // gọi sự kiện toolbar
        me.initEventToolbar();

        // gọi sự kiện table
        me.initEventTable();

        // gọi dự kiện page left
        me.initEventPageLeft();
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

    // Hàm khởi tạo sự kiện table
    initEventTable() {
        let me = this;

        me.grid.off("click", "tr");
        me.grid.on("click", "tr", function() {
            me.grid.find(".active").removeClass("active");

            $(this).addClass("active");
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

    // Hàm thêm mới nhân viên
    add() {
        let me = this,
            param = {
                parent: me,
                formMode: resources.CommandType.Add
            };
        
        if(me.formpage) {
            me.formpage.open(param);
        }
    }

    // Hàm lấy dữ liệu
    getData() {
        // let me = this,
        //     data = employees;
        
        // return data;

        let me = this,
            Url = "http://localhost:3000/employees";

        let data = CommonFn.Ajax(Url, resources.Method.Get, {}, function(response))
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
    loadData() {
        let me = this,
            data = me.getData();

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
        me.showCountEmployee(data);
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
            
            th.text(text);

            tr.append(th);
        });
        thead.append(tr)
        return thead;
    }

    // Hàm render tr chứa td
    rendertbody(data) {
        let me = this,
            tbody = $("<tbody></tbody>");
            // gridBody = $("<div></div>");
        
        if(data) {
            data.filter(function(item) {
                let tr = $("<tr></tr>");

                me.columnCofig.filter(function(column) {
                    let td = $("<td></td>"),
                        fieldName = column.FieldName,
                        dataType = column.DataType,
                        value = me.getValueCell(item, fieldName, dataType);

                    td.text(value);
                    
                    tr.append(td);
                });
                tbody.append(tr);
            });
            // gridBody.html(tbody);
        }
        return tbody;
    }
    
    // Hàm lấy dữ liệu của từng cell
    getValueCell(item, fieldName, dataType) {
        let me = this,
            value = item[fieldName];

        if(value) {
            switch(dataType) {
                case resources.dataType.Enum:
                    break;
                case resources.dataType.Date:
                    break;
                case resources.dataType.Money:
                    value = CommonFn.formatMoney(value);
                    break;
            }
        }
        return value;
    }

    // Hàm show số lượng employee
    showCountEmployee(data) {
        let me = this,
            sl = me.getCountEmployee(data);

        me.count_show.find(".count_datatable")[0].innerText = `01-${sl}/${sl}`;
        me.count_show.find(".count_datatable")[1].innerText = `${sl} lao động/trang`;
    }

    // Lấy ra số lượng nhân viên
    getCountEmployee(data) {
        let me = this,
            count = 0;
            
        data.filter(function(item) {
            count++;
        });
        return count;
    }
}
// Gọi class để thực thi
var employeePage = new EmployeePage("employeegrid", "colab_table", "employeePage_left");
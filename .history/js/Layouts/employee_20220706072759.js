class Employee {
    constructor (gridID, collabID) {
        let me = this;

        me.grid = $(`#${gridID}`);

        me.count_show = $(`#${collabID}`);

        // Gọi đến màn hình Form
        me.formpage = new FormNewEmployee("FormID");

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
    }

    // Hàm sự kiện toolbar
    initEventToolbar() {
        let me = this,
            toolbarID = me.grid.attr("Toolbar");

            $(`#${toolbarID}[commandType]`).off("click");
            $(`#${toolbarID}[commandType]`).on("click", function() {
                let CommandType = $(this).attr("commandType");

                console.log($(this));

                if(me[CommandType] && typeof me[CommandType] == "function")
                 {
                    me[CommandType]();
                 }
            });
    }

    // Hàm lấy ra các columns
    columnConfig() {
        let me = this;
            columnDefault = {
                FieldName: "",
                DataType: "string",
                Text: "",
            },
            columns = [];

        me.grid.find(".col").each(function(item) {
            let column = {...columnDefault},
                
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
        let me = this,
            data = employees;
        
        return data;
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
            tr_th = me.renderth(),
            tr_td = me.rendertd(data);
        
        table.append(tr_th);
        table.append(tr_td);

        me.grid.remove(table);
        me.grid.append(table);
        me.showCountEmployee(data);
    }

    // Hàm render tr chứa th
    renderth() {
        let me = this,
            tr = $("<tr></tr>");
        
        me.grid.find(".col").each(function() {
            let text = $(this).text(),
                dataType = $(this).attr("DataType"),
                th = $("<th></th>");
            
            th.text(text);

            tr.append(th);
        });
        return tr;
    }

    // Hàm render tr chứa td
    rendertd(data) {
        let me = this,
            tbody = $("<tbody></tbody>");
        
        if(data) {
            data.filter(function(item) {
                let tr = $("<tr></tr>");
                me.grid.find(".col").each(function() {
                    let td = $("<td></td>"),
                        fieldName = $(this).attr("FieldName"),
                        dataType = $(this).attr("DataType"),
                        value = me.getValueCell(item, fieldName, dataType);

                    td.text(value);
                    
                    tr.append(td);
                });
                tbody.append(tr);
            });
        }
        return tbody;
    }
    
    // Hàm lấy dữ liệu của từng cell
    getValueCell(item, fieldName, dataType) {
        let me = this,
            value = item[fieldName];

        if(value) {
            switch(dataType) {
                case resources.dataType.enum:
                    break;
                case resources.dataType.date:
                    break;
                case resources.dataType.money:
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
var employee = new Employee("employeegrid", "colab_table");
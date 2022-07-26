class Employee {
    constructor (gridID) {
        let me = this

        me.grid = $(`#${gridID}`);

        // Khởi tạo sự kiện
        me.initEvent();

        // Lấy dữ liệu
        me.getData();
    }


    // Hàm chứa sự kiện
    initEvent() {
        let me = this;
    }

    // Hàm lấy dữ liệu
    getData() {
        let me = this,
            data = Employee;
        
        me.loadData(data);
    }

    // Hàm load dữ liệu
    loadData(data) {
        let me = this;

        if(data) {
            me.renderData(data);
        }
    }

    // Hàm đưa dữ liệu lên trang
    renderData(data) {
        let me = this,
            table = $("<table></table>"),
            tr_th = renderth(),
            tr_td = rendertd(data);
        
        table.append(tr_th);
        table.append(tr_td);

        me.grid.html(table);
    }

    // Hàm render tr chứa th
    renderth() {
        let me = this,
            tr = $("<tr></tr>");
        
        me.grid.find(".col").each(function(item) {
            let text = $(this).text,
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
            tr = $("<tr></tr>");
        
        if(data) {
            data.filter(function(item) {
                me.grid.find(".col").each(function() {
                    let td = $("<td></td>"),
                        fieldName = $(this).attr("FieldName"),
                        dataType = $(this).attr("DataType"),
                        value = me.getValueCell(item, fieldName, dataType);

                    td.text(value);
                    
                    tr.append(td);
                });
            });
        }
        return tr;
    }
    
    // Hàm lấy dữ liệu của từng cell
    getValueCell(item, fieldName, dataType) {
        let me = this;,
            
    }
}
// Gọi class để thực thi
var employee = new Employee("employeegrid");
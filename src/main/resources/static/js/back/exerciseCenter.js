
var results = undefined;
var score = 100;

//生成算式
function doGenerate(){
    var number = $('#number').val()
    if (number==''){
        layer.alert("请输入题目数量！");
        return ;
    }
    if (number > 100){
        layer.alert("题目数量不得大于100！");
        return ;
    }
    var id = document.getElementsByName('type');
    console.log(id.length)

    var value = new Array();
    for(var i = 0; i < id.length; i++){
        if(id[i].checked)
            value.push(id[i].value);
    }
    if (value.length==0){
        layer.alert("至少选择一种运算符号！");
        return ;

    }
    $('#tips').html('');
    $.ajax({
        url:"doGenerate",
        type:"post",
        traditional:true,
        dataType:"json",
        data:{
            value : value,
            number : number
        },

        success:function(data){
            if (data.errmsg==='ok'){
                // console.log(data);
                showData(data.data.counts,data.data.results);
                results = data.data.results;
                $('#submit').attr("disabled",false);
                return ;
            }
            layer.msg(data.errmsg);
        },

        error:function(err){
            console.log(err)
        }
    })


}

//提交算式
function doSubmit(){
    var score = 100;
    var right = 0;
    $('#submit').attr("disabled",true);

    var inputs = document.getElementsByClassName("inputs");
    var spans = document.getElementsByName("spans");

    for (let i = 0; i < inputs.length ; i++){
        if (inputs[i].value == results[i]){
            spans[i].innerHTML ="答案：" + results[i] + ' ✔';
            right++;
        }else {
            spans[i].innerHTML = "答案" +  results[i] + ' ✖';
        }
        spans[i].style.display="block";
        inputs[i].disabled = true;
    }
    //最终得分,保留小数点后2位
    score = ((right/inputs.length)*score).toFixed(2);
    $('#tips').html('你一共答对了'+right+'道题，最终的得分为'+score+'分。');

    //提交分数
    $.ajax({
        url:"doSubmit",
        type:"post",
        dataType:"json",
        data:{
            number: inputs.length,
            score : score
        },

        success:function(data){
            if (data.errmsg==='ok'){

            }
            layer.msg(data.errmsg);
        },

        error:function(err){
            console.log(err)
        }
    })

}



function showData(data,result) {
    $('#exercise').empty();
    for (let i = 0; i < data.length ; i++){
        let str = `
            <div class="col-xs-6 col-sm-4 col-md-3">
                <div class="panel">
                    <div class="panel-body">
                        <h4 class="title" style="font-size: 30px">
                        ${data[i]}
                        <span style="color: red;display: none" name = spans >${result[i]}</span>
                        <input type="text" style="flex: initial" class="inputs">
                        </h4>
                        <div class="info">
                        </div>
                    </div>
                </div>
            </div>

        `;
        $('#exercise').append(str);
    }
}
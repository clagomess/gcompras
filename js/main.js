var ns = $.initNamespaceStorage('gcompras');

$(document).ready(function () {
    $('[modal]').click(function (e) {
        e.preventDefault();

        $('#modal').modal('show');
        $("#modal .modal-content *").remove();
        $("#modal .modal-content").load($(this).attr('modal'));
    });

    // Monta Lista Item
    if(!ns.localStorage.get("TblItem")){
        ns.localStorage.set("TblItem", []);
    }

    monta_lista();

    $('#limpar').click(function(){
        var arItem = ns.localStorage.get("TblItem");

        for(var i in arItem){
            if(arItem.hasOwnProperty(i)) {
                if(!arItem[i].sitAtivo){
                    arItem.splice(i, 1);
                }
            }
        }

        ns.localStorage.set("TblItem", arItem);

        monta_lista();
    });
});

function monta_lista(){
    var arItem = ns.localStorage.get("TblItem");

    if(arItem.length){
        $("#TblItem .list-group").show();
        $("#TblItem .panel-body").hide();
    } else {
        $("#TblItem .list-group").hide();
        $("#TblItem .panel-body").show();
    }

    $("#TblItem .list-group").html('');

    for(var i in arItem){
        if(arItem.hasOwnProperty(i)) {
            var html = '';

            html += '<a href="javascript:;" seqitem="'+ i +'" class="list-group-item '+(arItem[i].sitAtivo ? '' : 'disabled')+'">';
            html += arItem[i].desItem;
            html += ' <span class="badge" >' + arItem[i].numItem + '</span>';
            html += '</a>';

            $("#TblItem .list-group").append(html);
        }
    }

    $('[seqitem]').click(function(){
        var arItem = ns.localStorage.get("TblItem");
        var i = parseInt($(this).attr('seqitem'));

        if($(this).hasClass('disabled')) {
            arItem[i].sitAtivo = 1;
        }else{
            arItem[i].sitAtivo = 0;
        }

        ns.localStorage.set("TblItem", arItem);

        monta_lista();
    });
}
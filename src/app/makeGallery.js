export default function makeGallery(params){
  var htmlStr = '',
    images = params.arr,
    columns = params.columns,
    row = true,
    classList = 'picture ';
    var residue = 0;

  if(images.length>columns){
    residue = images.length%columns;
  }

  switch(columns){
    case 2:
      classList += 'table-cell width-50';
      break;
    case 3:
      classList += 'table-cell width-33';
      break;
    case 4:
      classList += 'table-cell width-25';
      break;
    case 5:
      classList += 'table-cell width-20';
      break;
    default:
      classList += '';
  }

  for(var i=0; i<images.length;){
    for(var j=1;j<=columns; j++){
      if(row){
        htmlStr += '<div class="row">';
        row = false;
      }

      if(images[i] == undefined){
        htmlStr += '</div>';
        break;
      }

      htmlStr += '<div class="' + classList + '"><img src="' + images[i] + '" alt="pic"></div>';
      if(j === columns){
        htmlStr += '</div>';
        row = true;
      }
      i++;
    }
  }

  return new Promise(function(resolve, reject) {
    resolve({htmlString: htmlStr, residue: residue, classList: classList});
  });
}

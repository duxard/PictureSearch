import GoogleImages from 'google-images';

const API_KEY = 'AIzaSyCyVMf4oJ9_YRn_ue3DrnWLLWOPlqDSaOU';
const CSE_ID = '015311017377742702038:kouiw133nki';

const client = new GoogleImages(CSE_ID, API_KEY);

//client.search('car').then(result => console.log(result)).catch(err => console.log(err));
//client.search('flowers').then(result => console.log(result)).catch(err => console.log(err));

/*
export default function googleImagesLoader(){
  var counter = 0;
  return function(){
    client.search('flowers',{start: counter}).then(result => {
      console.log(result);
      return result;
    }).catch(err => console.log(err));
    counter += 10;
  }
}
*/

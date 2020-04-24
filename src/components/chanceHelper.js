export default function chance(rate){
    var random = Math.random() * rate;
    if(random <= rate){
        return true;
    }else{
        return false
    }
}
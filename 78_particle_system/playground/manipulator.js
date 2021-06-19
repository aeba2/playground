class Manipulator{
  constructor(){
    this.objects = [];
  }
  
  push(){
    let obj;
    if(random(1) < 0.5){
      obj = new Particle();
    }else{
      obj = new Confetti();
    }
    this.objects.push(obj);
  }
  
  delete(){
    
  }
  
}
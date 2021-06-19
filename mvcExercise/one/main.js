//MVCの練習

/*                             各クラス                           */
//Viewクラス:DOMを作るクラス
class View{
	constructor(_items,_controller){
  	this.items = _items;
    this.controller = _controller;
  }
  static setup(_controller){
    const controller = _controller;
    
    const items = {};
    
    const inputWrapper = items.inputWrapper = document.body.appendChild(document.createElement("div"));
    const age = items.age = inputWrapper.appendChild(document.createElement("input"));
    const name = items.name = inputWrapper.appendChild(document.createElement("input"));
    const face = items.face = inputWrapper.appendChild(document.createElement("input"));
    
    const displayWrapper = items.displayWrapper = document.body.appendChild(document.createElement("div"));
    const presentFace = items.presentFace = displayWrapper.appendChild(document.createElement("div"));
    const oldFace = items.oldFace = displayWrapper.appendChild(document.createElement("div"));
    const analysis = items.analysis = displayWrapper.appendChild(document.createElement("div"));
    
    const consoleWrapper = items.consoleWrapper = document.body.appendChild(document.createElement("div"));
    const run = items.run = consoleWrapper.appendChild(document.createElement("button"));
    const saveJson = items.saveJson = consoleWrapper.appendChild(document.createElement("button"));
    const clear = items.clear = consoleWrapper.appendChild(document.createElement("button"));
    
    inputWrapper.id = "inputWrapper";
    
    age.type = "number";
    age.id = "age";
    age.placeholder = "現在の年齢";
    age.addEventListener("change",e => controller.getValueFromDOM(e));
    
    name.type = "text";
    name.id = "name";
    name.placeholder = "氏名";
    name.addEventListener("change",e => controller.getValueFromDOM(e));
    
    face.type = "file";
    face.id = "face";
    face.addEventListener("change",e => controller.load(e));
    
    displayWrapper.id = "displayWrapper";
    
    presentFace.id = "presentFace";
    presentFace.innerText = "現在の顔を表示 ->";
    
    oldFace.id = "oldFace";
    oldFace.innerText = "年取った顔を表示 ->";
    
    analysis.id = "analysis";
    analysis.innerText = "分析結果を表示 ->";
    
    consoleWrapper.id = "consoleWrapper";
    
    run.innerText = "run";
    run.id = "run";
    run.addEventListener("click",e => controller.run());
    
    saveJson.innerText = "saveJson";
    saveJson.id = "saveJson";
    saveJson.addEventListener("click",e => controller.saveJson());

    clear.innerText = "clear";
    clear.id = "clear";
    clear.addEventListener("click",e => controller.clear());
    
    
    
  	return new View(items,controller);
  }
  
  update(_data){
    const items = this.items;
    const data = _data;
    
    for(let key in data){
      const dataValue = data[key];
      const element = items[key];
      
      element.value = dataValue;
    }
    console.log(this.items)
  }
}

//Controllerクラス:主にDOMのイベントリスナーのコールバック関数を設定する
class Controller{
	constructor(_model){
    console.log(_model)
     this.model = _model;
  }
  
  //DOMのエレメントから値を受け取る関数
  getValueFromDOM(_e){
    const element = _e.target;
    const model = this.model;
    model.setValue(element);
  }
  //顔の画像ファイルを読み込んでDOMに描画するメソッド
  load(_e){
    
  }
  //作成したデータを保存
  saveJson(_data = this.model.data){
    const data = _data;
    const json = JSON.stringify(data);
  }
  //データをクリアする
  clear(){
    const model = this.model;
    model.clear();
  }
}

//Modelクラス:アプリケーションの中枢、データを管理
//Viewの世話をする
class Model{
  constructor(){
    this.data = {
      age:0,
      name:"",
      presentFace:"",
      oldFace:"",
      analysis:{}
    }
    
    this.view = {};
  }
  
  setValue(_element){
    const property = _element.id;
    const value = _element.value;
    const data = this.data;
    
    data[property] = value;
    console.log(this.data)
  }
  
  clear(_view = this.view){
    const view = _view;
    const data = this.data;
    
    data.age=0;
    data.name = "";
    data.presentFace = "";
    data.oldFace = "";
    data.analysis = {};
    
    view.update(data);
  }
  
  getView(_view){
    this.view = _view;
  }
}

//Managerクラス: View,Controller,Modelを統一するための補助クラス
class Manager{
  static start(){
    const model = new Model();
    const controller = new Controller(model);
    const view = View.setup(controller);
    console.log(view.items)
    model.getView(view);
  }
}

/*                           アプリケーションスタート                                   */
Manager.start();
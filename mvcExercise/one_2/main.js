//MVCの練習

/*                             各クラス                           */
//Viewクラス:DOMを作るクラス
class View{
	constructor(_items,_controller){
  	this.items = _items;
    this.controller = _controller;
  }
	
	//セットアップ関数
  static setup(_controller){
    const controller = _controller;
    
    const items = {};
    
    const inputWrapper = items.inputWrapper = document.body.appendChild(document.createElement("div"));
		const wordToFind = items.wordToFind = inputWrapper.appendChild(document.createElement("input"));
		const wordToReplaceWith = items.wordToReplaceWith = inputWrapper.appendChild(document.createElement("input"));
    const fileSelect = items.fileSelect = inputWrapper.appendChild(document.createElement("input"));
		
    
    const displayWrapper = items.displayWrapper = document.body.appendChild(document.createElement("div"));
//    const presentFace = items.presentFace = displayWrapper.appendChild(document.createElement("div"));
//    const oldFace = items.oldFace = displayWrapper.appendChild(document.createElement("div"));
		const textData = items.textData = displayWrapper.appendChild(document.createElement("input"));
    const analysis = items.analysis = displayWrapper.appendChild(document.createElement("div"));
    
    const consoleWrapper = items.consoleWrapper = document.body.appendChild(document.createElement("div"));
    const run = items.run = consoleWrapper.appendChild(document.createElement("button"));
    const saveJson = items.saveJson = consoleWrapper.appendChild(document.createElement("button"));
    const clear = items.clear = consoleWrapper.appendChild(document.createElement("button"));
    
    inputWrapper.id = "inputWrapper";
    
    wordToReplaceWith.type = "text";
    wordToReplaceWith.id = "wordToReplaceWith";
    wordToReplaceWith.placeholder = "replace with";
    wordToReplaceWith.addEventListener("change",e => controller.replace(e));
    
    wordToFind.type = "text";
    wordToFind.id = "wordToFind";
    wordToFind.placeholder = "wordToFind";
    wordToFind.addEventListener("change",e => controller.find(e));
    
    fileSelect.type = "file";
    fileSelect.id = "fileSelect";
    fileSelect.addEventListener("change",e => controller.load(e));
		
		
    
    displayWrapper.id = "displayWrapper";
    
//    presentFace.id = "presentFace";
//    presentFace.innerText = "現在の顔を表示 ->";
    
//    oldFace.id = "oldFace";
//    oldFace.innerText = "年取った顔を表示 ->";
		textData.type = "text";
    textData.id = "textData";
		textData.value = "";
		
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
  //wordToFindフォームに書かれた文字を取得してmodelに検索実行させる関数
	find(_e){
		this.getValueFromDOM(_e);
		const model = this.model;
		model.find();
	}
	//wordToReplaceWithフォームに書かれた文字を取得してmodelにreplaceを実行させる関数
	replace(){
		this.getValueFromDOM(_e);
		const model = this.model;
		model.replace();
	}
  //DOMのエレメントから値を受け取ってmodelにセットする関数
  getValueFromDOM(_e){
		const model = this.model;
    const element = _e.target;
		const property = element.id;
    const value = element.value;
    model.setValue(property,value);
  }
  //選択されたファイルを読み込み、modelにロード処理をさせる関数
	load(_e){
			const file = _e.target.files;
			const reader = new FileReader();
			reader.readAsText(file[0]);			
			
			reader.onload = () => {
				const result = reader.result;
				console.log(result);
				const model = this.model;
				model.load(result);
			};	  
  }
  //modelに作成したデータを保存させる関数
  saveJson(_data = this.model.data){
    const data = _data;
    const json = JSON.stringify(data);
  }
  //modelにフォームのクリアを実行させる関数
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
      wordToReplaceWith:0,
      wordToFind:"",
			textData:"",
//      presentFace:"",
//      oldFace:"",
      analysis:{
				meta:[],
				wordToFind:0,
			  found:0
			}
    }
    
    this.view = {};
  }
	
	exhibit(_positionData,_textData){
		const highLighted = _textData;
		
	}
	
	detectPositions(_textData,_wordToFind,_flags = "g"){
		const regexp = RegExp(_wordToFind,_flags);
		const positionData = [];
		const match = _textData.matchAll(regexp);
		
		for(const match of matches){
			console.log(`Found ${match[0]} start=${match.index} end=${match.index + match[0].length}.`);
      positionData.push({start:match.index,end:match.index + match[0].length});
		}
		return positionData;
	}
	
	find(){
		const backupOriginal = "";
		
		const textData = this.textData;
		const wordToFind = this.wordToFind;
		const positionData = this.detectPositions(textData,wordToFind);
		
		//textData.replace(wordToFind,`<span></span>`);
		
		
		//this.exhibit(positionData,textData);
		
	}
	
	replace(){
	}
	
	load(_result){
		const value = _result;
		this.setValue("textData",value);

		const view = this.view;
		const data = this.data;
		view.update(data);		
	}
  
	
  setValue(_property,_value){
		const view = this.view;
    const data = this.data;
    data[_property] = _value;
    console.log(this.data)
		//view.update(data);
  }
  
  clear(_view = this.view){
    const view = _view;
    const data = this.data;
    
    data.wordToReplaceWith=0;
    data.wordToFind = "";
		data.textData = "";
  //  data.presentFace = "";
  //  data.oldFace = "";
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
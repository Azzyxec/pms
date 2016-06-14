
var Store = {
  list:[],
  add: function(pkey, pobj){
    for(var i = 0; i < this.list.length; i++){
      if(this.list[i].key == pkey){
        this.list[i].value = pobj;
        return;
      }
    }
    list.push({key: pkey, value: pobj});
  },
  get: function(pkey) {
    for(var i = 0; i < this.list.length; i++){
      if(this.list[i].key == pkey){
        return this.list[i].value;
      }
    }
    return null;
  },
} 

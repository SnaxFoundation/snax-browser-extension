const SCOPE = {
  SINGLETON: Symbol('SINGLETON'),
  OBJECT: Symbol('OBJECT'),
};

class ClassContextCell {
  
  _initiated = null;
  
  constructor(Class, scope, contextManager) {
    this.Class = Class;
    this.scope = scope;
    this._contextManager = contextManager;
  }
  
  equals(ClassOrClassCell) {
    if (ClassOrClassCell instanceof ClassContextCell) {
      return ClassOrClassCell.Class === this.Class;
    }
    
    return ClassOrClassCell === this.Class;
  }
  
  getInstance() {
    if (this.scope === SCOPE.SINGLETON) {
      return this._getSingleton();
    }
    
    if (this.scope === SCOPE.OBJECT) {
      return this._getObject();
    }
    
    throw new Error('Scope definition is incorrect');
  }
  
  _getSingleton() {
    if (!this._initiated) {
      this._initiated = this._getObject();
    }
    
    return this._initiated;
  }
  
  _getObject() {
    return new this.Class(this._contextManager)
  }
}

class ClassGroupContextCell {
  classes = [];
  _contextManager = null;
  
  constructor(classesCells = [], contextManager) {
    this._contextManager = contextManager;
    this.classes = classesCells;
  }
  
  addAndCopy(Class) {
    const hasEquals = this.classes.some(it => it === Class);
    
    if (hasEquals) {
      throw new Error('Class is already defined, class name is: ' +  Class.name);
    }
    
    return new ClassGroupContextCell(this.classes.concat(Class), this._contextManager);
  }
}

export class DependencyContext {
  static SCOPE = SCOPE;
  
  classes = null;
  groups = null;
  
  constructor(classes = new Map(), groups = new Map()) {
    this.classes = classes;
    this.groups = groups;
  }
  
  defineClass(Class, value = Class, scope = SCOPE.SINGLETON) {
    this._validateDefinition(Class);
    this.classes.set(Class, new ClassContextCell(value, scope, this));
  }

  addClassToGroup(type, Class, value = Class, scope = SCOPE.SINGLETON) {
   this.defineClass(Class, value, scope);
   
    const groupContextCell = this.groups.get(type)
      || new ClassGroupContextCell([], this);
    
    this.groups.set(type, groupContextCell.addAndCopy(value));
  }
  
  resolveClass(Class) {
    const contextCell = this.classes.get(Class);
  
    if (!contextCell) {
      throw new Error('Class ' + Class.name + ' is not defined');
    }
    
    return contextCell.getInstance();
  }
  
  resolveClassGroup(type) {
    return this.groups
      .get(type).classes.map(it => this.resolveClass(it))
  }
  
  _validateDefinition(Class) {
    if (this.classes.has(Class)) {
      throw new Error('Redefinition is prohibited');
    }
  }
}
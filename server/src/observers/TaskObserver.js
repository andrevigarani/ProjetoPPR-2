class TaskObserver {
  static observers = [];

  static addObserver(observer) {
      TaskObserver.observers.push(observer);
      console.log('addObserver: ' + observer.name)
  }

  static removeObserver(observer) {
      const index = TaskObserver.observers.indexOf(observer);
      if (index !== -1) {
          TaskObserver.observers.splice(index, 1);
      }
  }

  static notifyAddition(task) {
      TaskObserver.observers.forEach(observer => {
          observer.updateAddition(task);
          console.log('Task added successfully;', observer)
      });
  }

}

module.exports = TaskObserver;

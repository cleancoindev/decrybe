import { observable, action, computed, toJS } from "mobx"
import * as nodeInt from '../modules/nodeInt'
import {RootStore} from './RootStore'

class TasksStore {
	@observable allTasksIds
	@observable allTasksData = []
	@observable length
	@observable taskData
	@observable currentTask
	@observable filteredTasks
		
	constructor(public root: RootStore) {
		this.root = root
	}

	async loadTasks(isLogin, dapp, network) {
		if (isLogin) {
			let allTasksData = await nodeInt.getTasksAllData(this.root.user.getStorage, dapp, network)
			
			console.log('tasks loaded')
			if (allTasksData) {
				this.allTasksData = allTasksData;
				console.log(this.getFilteredTasks)
				this.length = allTasksData.length
			} else {
				console.log('allTasksData is false')
			}
			
		} else {
			console.log('user not login')
		}
	}

	async updateTasks(isLogin, dapp, network) {
		if (isLogin) {
			let allTasksData = await nodeInt.getTasksAllData(this.root.user.getStorage, dapp, network)
			console.log(allTasksData)
			console.log('tasks loaded')
			if (allTasksData) {
				this.allTasksData = allTasksData
			} else {
				console.log('allTasksData is false')
			}
			
		} else {
			console.log('user not login')
		}
	}

	@action
	addTask(data: Object) {
		this.allTasksData.push(data)
		console.log('pushing!')
	}
	@action
	async getTaskData (id) {
		if (this.root.user.isLogin) {
			let task = await nodeInt.getTaskData(this.root.user.getStorage,id, this.root.user.getDapp, this.root.user.getUserNetwork)
			return task
		} else {
			return false
		}
	}

	@action
	setCurrentTaskId = id => {
	  this.currentTask = id;
	};

	@action
	setFilteredTasks = tasks => {
		this.filteredTasks = tasks;
	};

	@action
	setAllTasksData = data => {
		this.allTasksData = data;
	};


	@computed get getFilteredTasks () {
		if (this.filteredTasks) {
			return toJS(this.filteredTasks);
		} else {
			return toJS(this.allTasksData);
		}
	}


	@action
	setTasks = (tasks) => {
	  this.allTasksData = tasks;
	};

	@computed get getTasks () {
		return this.allTasksData;
	}

	@computed get getLength () {
		return this.length;
	}

	@computed get getAllTasksIds () {
		if (this.allTasksIds.length > 0) 
			return this.allTasksIds
	}

	@computed get getAllTasksLength () {
		if (this.allTasksData.length > 0) 
			return this.allTasksData.length
	}

	@action getTaskAuthor (i) {
		if (this.allTasksData.length > 0)
			return this.allTasksData[i].author;
	}

	@action getTaskTitle (i) {
		if (this.allTasksData.length > 0)
		return this.allTasksData[i].title;
	}

	@action getTaskContents (i) {
		if (this.allTasksData.length > 0)
		return this.allTasksData[i].contents;
	}

	@action getTaskCreateTime (i) {
		if (this.allTasksData.length > 0)
		return this.allTasksData[i].createTime;
	}

	@action getTaskPrice (i) {
		if (this.allTasksData.length > 0)
		return this.allTasksData[i].price;
	}

	@action getTaskDescription (i) {
		if (this.allTasksData.length > 0)
		return this.allTasksData[i].description;
	}

	@action getTaskImage (i) {
		if (this.allTasksData.length > 0)
		return this.allTasksData[i].image;
	}
		
}

export { TasksStore }
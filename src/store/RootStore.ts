import { UserStore } from './UserStore';
import { TasksStore } from './TasksStore';
import { TaskCreateStore } from './TaskCreateStore'
import { SettingsStore } from './SettingsStore'
import { UsersStore } from './UsersStore'
import { SnackbarStore } from './SnackbarStore'
import { autorun } from "mobx"
import { TaskEditStore } from './TaskEditStore';
import { DisputesStore } from './DisputesStore';
import { DisputeCreateStore } from './DisputeCreateStore';

class RootStore {
  public user: UserStore;
  public tasks: TasksStore;
  public taskCreate: TaskCreateStore;
  public settings: SettingsStore;
  public users: UsersStore;
  public snackbar: SnackbarStore;
  public taskEdit: TaskEditStore;
  public disputes: DisputesStore;
  public disputeCreate: DisputeCreateStore
	
  constructor() {
    this.user = new UserStore(this);
    this.tasks = new TasksStore(this);
    this.taskCreate = new TaskCreateStore(this);
    this.settings = new SettingsStore(this);
    this.users = new UsersStore(this);
    this.snackbar = new SnackbarStore(this);
    this.taskEdit = new TaskEditStore(this);
    this.disputes = new DisputesStore(this);
    this.disputeCreate = new DisputeCreateStore(this);
  }
}

let rootStore = new RootStore()

autorun(async () => {
  window.onload = () => {
    if (rootStore.user.checkSession()) {
      console.log('check session true')
      if(window.WavesKeeper === undefined) {
        console.log('Waves Keeper not installed')
        rootStore.user.restoreWithoutWavesKeeper()
      } else {
        rootStore.user.restoreSession();
      }
    } else {
      console.log('check session false')
      if(window.WavesKeeper === undefined) {
        console.log('Waves Keeper not installed')
        rootStore.user.withoutWavesKeeper()

      } else {
        rootStore.user.setWavesKeeper(WavesKeeper)
        rootStore.user.setShowRegister(true)
      }
    }
    
    
    window.WavesKeeper.on("update", state => {
      console.log('waves keeper update')
      if (rootStore.user.checkSession()) {
        if(window.WavesKeeper === undefined) {
          console.log('Waves Keeper not installed')
        } else {
          rootStore.user.restoreSession();
        }
      } else {
        if(window.WavesKeeper === undefined) {
          console.log('Waves Keeper not installed')
        } else {
          rootStore.user.setWavesKeeper(WavesKeeper)
          rootStore.user.setShowRegister(true)
        }
      }
  });
  
  }
  setInterval(() => rootStore.user.updateStorage(), 60000);
});

export default rootStore;
export { RootStore }
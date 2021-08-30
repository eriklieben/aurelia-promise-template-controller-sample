import Aurelia, { /*, StyleConfiguration*/ } from 'aurelia';
import { MyApp } from './my-app';
// Css files imported in this main file are NOT processed by style-loader
// They are for sharedStyles in shadowDOM.
// However, css files imported in other js/ts files are processed by style-loader.
// import shared from './shared.css';

Aurelia
  /*
  .register(StyleConfiguration.shadowDOM({
    // optionally add the shared styles for all components
    sharedStyles: [shared]
  }))
  */
  .app(MyApp)
  .start();


  import { ILifecycleHooks, lifecycleHooks } from 'aurelia';

@lifecycleHooks()
export class AnimatorHooks implements ILifecycleHooks {

  constructor() {
    console.log('animator hook console log in ctor');
  }

  public created() {
    console.log('created'); 
  }


  public attaching(vm) {
    console.log('attaching');
    return vm.$controller.host.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 250 }).finished;
  }
  public detaching(vm) {
    console.log('detaching');
    return vm.$controller.host.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 250 }).finished;
  }
}


Aurelia.register(AnimatorHooks);
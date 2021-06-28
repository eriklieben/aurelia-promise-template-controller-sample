export class MyApp {
  public message = 'Hello World!';

  public profileDataPromise: Promise<any>;
  public profileDataQuickPromise: Promise<any>;

  public readerslist: HTMLDivElement;
  public readerslistQuick: HTMLDivElement;

  public binding() {
    this.profileDataPromise = this.getProfileDataAsync(2000, this.readerslist);
    this.profileDataQuickPromise = this.getProfileDataAsync(200, this.readerslistQuick);
  }

  private async getProfileDataAsync(loadTimeMs: number, div: HTMLDivElement): Promise<any> {

    const start = new Date().getTime();
    await new Promise(resolve => setTimeout(() => { resolve(undefined) }, loadTimeMs));
    const elapsed = new Date().getTime() - start;

    if (elapsed >= 300) {
      // fade out the div (loading skeleton)
      await div.animate([ 
        { opacity: 1 }, 
        { opacity: 0 }
      ], { duration: 250 }).finished;
    }

    // fade in the div (containing loaded content)
    div.animate([
      { opacity: 0 },
      { opacity: 1 }
    ], { duration: 250 });

    return [
      new ProfileData ('https://randomuser.me/api/portraits/lego/5.jpg', 'Person 1', 'Developer'),
      new ProfileData ('https://randomuser.me/api/portraits/lego/3.jpg', 'Person 2', 'Techical writer'),
      new ProfileData ('https://randomuser.me/api/portraits/lego/6.jpg', 'Person 3', 'Product owner')
    ];    
  }
}

export class ProfileData {
  constructor(public profileImageUrl: string, public name: string, public description: string) {
  }
}

export namespace UserManagement {
  export namespace Admin {
    export class AdminUser {
      constructor(
        public name: string,
        public email: string,
        public isSuperAdmin: boolean
      ) {}

      setSuperAdmin(status: boolean): void {
        this.isSuperAdmin = status;
        console.log(
          `${this.name} теперь ${
            status ? "супер-администратор" : "обычный администратор"
          }.`
        );
      }
    }
  }
}

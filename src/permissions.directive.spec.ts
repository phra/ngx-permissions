import { PermissionsDirective } from './permissions.directive';
import { Component } from '@angular/core';
import { NgxPermissionsModule } from './index';
import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { PermissionsService } from './permissions.service';
import { RolesService } from './roles.service';

enum PermissionsTestEnum {
    ADMIN = <any> 'ADMIN',
    GUEST = <any> 'GUEST'
}

describe('PermissionsDirective', () => {
    it('should create an instance', () => {
        // const directive = new PermissionsDirective();
        expect(true).toBeTruthy();
    });
});

describe('Permission directive angular except', () => {
    @Component({selector: 'test-comp',
        template: `<ng-template permissions [permissionsExcept]="'ADMIN'"><div>123</div></ng-template>`})
    class TestComp {
        data: any;
    }

    let permissionService;
    let permissions;
    let fixture;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComp], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;

        permissionService = fixture.debugElement.injector.get(PermissionsService);

    });


    it('Should not show component', fakeAsync(() => {
        permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);
        tick();
        fixture.detectChanges();
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);

    }));

    it('Should  show the component', fakeAsync(() => {
        permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);
        detectChanges(fixture);

        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);

    }));

    it ('Should show the component', fakeAsync(() => {
        permissionService.loadPermissions([PermissionsTestEnum.GUEST]);
        detectChanges(fixture);

        let content = fixture.debugElement.nativeElement.querySelector('div');

        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    }));

    it ('Should hide component when permission added', fakeAsync(() => {
        permissionService.loadPermissions([PermissionsTestEnum.GUEST]);
        detectChanges(fixture);

        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('123');

        permissionService.addPermission(PermissionsTestEnum.ADMIN);
        detectChanges(fixture);

        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
    }));

    it ('Should show component when permission removed', fakeAsync(() => {
        permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);
        detectChanges(fixture);

        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);


        permissionService.removePermission(PermissionsTestEnum.ADMIN);
        detectChanges(fixture);

        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('123');
    }));
});

describe('Permission directive angular only', () => {
    @Component({selector: 'test-comp',
        template: `<ng-template permissions [permissionsOnly]="'ADMIN'"><div>123</div></ng-template>`})
    class TestComp {
        data: any;
    }

    let permissionService;
    let permissions;
    let fixture;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComp], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;

        permissionService = fixture.debugElement.injector.get(PermissionsService);

    });


    it('Should show the component', fakeAsync(() => {
        permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);
        detectChanges(fixture);

        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    }));
    it ('Should not show the component', fakeAsync(() => {
        permissionService.loadPermissions([PermissionsTestEnum.GUEST]);
        detectChanges(fixture);

        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
    }));

    it ('Should show component when permission added', fakeAsync(() => {
        permissionService.loadPermissions([PermissionsTestEnum.GUEST]);
        detectChanges(fixture);

        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionService.addPermission(PermissionsTestEnum.ADMIN);
        detectChanges(fixture);

        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();

        expect(content2.innerHTML).toEqual('123');
    }));

    it ('Should hide component when permission removed', fakeAsync(() => {
        permissionService.loadPermissions([PermissionsTestEnum.ADMIN, PermissionsTestEnum.GUEST]);
        detectChanges(fixture);

        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('123');

        permissionService.removePermission(PermissionsTestEnum.ADMIN);
        detectChanges(fixture);

        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
    }));
});

describe('Permission directive angular roles only', () => {
    @Component({selector: 'test-comp',
        template: `<ng-template permissions [permissionsOnly]="'ADMIN'"><div>123</div></ng-template>`})
    class TestComp {
        data: any;
    }

    let rolesService;
    let permissions;
    let fixture;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComp], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;

        rolesService = fixture.debugElement.injector.get(RolesService);

    });


    it('Should show the component when key of role is the same', fakeAsync(() => {
        rolesService.addRole('ADMIN', ['Awsesome']);
        detectChanges(fixture);

        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    }));
    it ('should show the component when permissions array is the same ', fakeAsync(() => {
        rolesService.addRole('GG', ['ADMIN']);
        detectChanges(fixture);

        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    }));

    it ('should hide the component when user deletes all roles', fakeAsync(() => {
        rolesService.addRole('ADMIN', ['Awsesome']);
        detectChanges(fixture);

        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');

        rolesService.flushRoles();
        tick();
        fixture.detectChanges();
        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));

    it ('should hide the component when user deletes one role', fakeAsync(() => {
        rolesService.addRole('ADMIN', ['Awsesome']);
        detectChanges(fixture);

        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');

        rolesService.removeRole("ADMIN");
        detectChanges(fixture);

        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));
});
describe('Permission directive angular roles only array', () => {
    @Component({selector: 'test-comp',
        template: `<ng-template permissions [permissionsOnly]="['ADMIN', 'GUEST']"><div>123</div></ng-template>`})
    class TestComp {
        data: any;
    }

    let rolesService;
    let permissions;
    let fixture;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComp], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;

        rolesService = fixture.debugElement.injector.get(RolesService);

    });


    it('Should show the component when key of role is the same', fakeAsync(() => {
        rolesService.addRole('ADMIN', ['Awsesome']);
        detectChanges(fixture);

        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    }));
    it ('should show the component when permissions array is the same ', fakeAsync(() => {
        rolesService.addRole('GG', ['ADMIN']);
        detectChanges(fixture);

        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    }));

    it ('should hide the component when user deletes all roles', fakeAsync(() => {
        rolesService.addRole('GG', ['ADMIN']);
        detectChanges(fixture);

        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');

        rolesService.flushRoles();
        detectChanges(fixture);

        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));

    it ('should hide the component when user deletes one roles', fakeAsync(() => {
        rolesService.addRole('GG', ['ADMIN']);
        detectChanges(fixture);


        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');

        rolesService.removeRole("GG");
        detectChanges(fixture);

        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));
});

describe('Permission directive angular roles except', () => {
    @Component({selector: 'test-comp',
        template: `<ng-template permissions [permissionsExcept]="'ADMIN'"><div>123</div></ng-template>`})
    class TestComp {
        data: any;
    }

    let rolesService;
    let permissions;
    let fixture;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComp], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;

        rolesService = fixture.debugElement.injector.get(RolesService);

    });


    it('Should hide the component when key of role is the same', fakeAsync(() => {
        rolesService.addRole('ADMIN', ['Awsesome']);
        detectChanges(fixture);

        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
    }));
    it ('should show the component when permissions array is the same ', fakeAsync(() => {
        rolesService.addRole('GG', ['ADMIN']);
        detectChanges(fixture);

        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);

    }));

    it ('should show the component when user deletes all roles', fakeAsync(() => {
        rolesService.addRole('ADMIN', ['Awsesome']);
        detectChanges(fixture);

        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);

        rolesService.flushRoles();
        detectChanges(fixture);

        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    }));

    it ('should show the component when user deletes one role', fakeAsync(() => {
        rolesService.addRole('ADMIN', ['Awsesome']);
        detectChanges(fixture);

        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);

        rolesService.removeRole("ADMIN");
        detectChanges(fixture);


        let content = fixture.debugElement.nativeElement.querySelector('div');

        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    }));
});
describe('Permission directive angular roles except array', () => {
    @Component({selector: 'test-comp',
        template: `<ng-template permissions [permissionsExcept]="['ADMIN', 'GUEST']"><div>123</div></ng-template>`})
    class TestComp {
        data: any;
    }

    let rolesService;
    let permissions;
    let fixture;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComp], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;

        rolesService = fixture.debugElement.injector.get(RolesService);

    });


    it('Should show the component when key of role is the same', fakeAsync(() => {
        rolesService.addRole('ADMIN', ['Awsesome']);
        detectChanges(fixture);

        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);

    }));
    it ('should show the component when permissions array is the same ', fakeAsync(() => {
        rolesService.addRole('GG', ['ADMIN']);
        detectChanges(fixture);

        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);

    }));

    it ('should show the component when user deletes all roles', fakeAsync(() => {
        rolesService.addRole('GG', ['ADMIN']);
        detectChanges(fixture);

        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);

        rolesService.flushRoles();
        detectChanges(fixture);

        let content = fixture.debugElement.nativeElement.querySelector('div');

        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    }));

    it ('should show the component when user deletes one roles', fakeAsync(() => {
        rolesService.addRole('GG', ['ADMIN']);
        detectChanges(fixture);

        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);

        rolesService.removeRole("GG");
        detectChanges(fixture);


        let content = fixture.debugElement.nativeElement.querySelector('div');

        expect(content).toBeTruthy();
        expect(content.innerHTML).toEqual('123');
    }));
});

describe('Permission directive angular testing different selectors *permmisionsOnly', () => {
    @Component({selector: 'test-comp',
        template: `<div *permissionsOnly="['ADMIN']"><div>123</div></div>`})
    class TestComp {
        data: any;
    }

    let rolesService;
    let permissions;
    let fixture;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComp], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;

        rolesService = fixture.debugElement.injector.get(RolesService);

    });


    it('Should show the component when key of role is the same', fakeAsync(() => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);

        rolesService.addRole('ADMIN', ['Awsesome']);
        detectChanges(fixture);


        let content2 = fixture.debugElement.nativeElement.querySelector('div');

        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));

    it('Should hide the component when key of role is the same', fakeAsync(() => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);

        rolesService.addRole('GG', ['Awsesome']);
        detectChanges(fixture);


        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);

    }));
});

describe('Permission directive angular testing different selectors *permmisionsExcept', () => {
    @Component({selector: 'test-comp',
        template: `<div *permissionsExcept="['ADMIN']"><div>123</div></div>`})
    class TestComp {
        data: any;
    }

    let rolesService;
    let permissions;
    let fixture;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComp], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;

        rolesService = fixture.debugElement.injector.get(RolesService);

    });


    it('Should show the component when key of role is the same', fakeAsync(() => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('Guest', ['Awsesome']);
        detectChanges(fixture);


        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));

    it('Should hide the component when key of role is the same', fakeAsync(() => {
        rolesService.addRole('ADMIN', ['Awsesome']);
        tick();
        fixture.detectChanges();


        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
    }));
});

describe('Permission directive angular testing different async functions in roles', () => {
    @Component({selector: 'test-comp',
        template: `<div *permissionsOnly="'ADMIN'"><div>123</div></div>`})
    class TestComp {
        data: any;
    }

    let rolesService;
    let permissions;
    let fixture;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComp], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;

        rolesService = fixture.debugElement.injector.get(RolesService);

    });


    it('Should show the component when promise returns truthy value', fakeAsync(() => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        // rolesService.addRole('ADMIN', () => {
        //     return Promise.resolve();
        // });
        rolesService.addRole('ADMIN', () => {
            return true;
        });
        detectChanges(fixture);
        tick();

        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));

    it('Should not show the component when promise returns truthy value', fakeAsync(() => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);

        rolesService.addRole('ADMIN', () => {
            return false;
        });
        detectChanges(fixture);
        tick();

        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));

    it('Should show the component when promise returns truthy value', fakeAsync(() => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('ADMIN', () => {
            return Promise.resolve(true);
        });
        detectChanges(fixture);
        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));

    it('Should not show the component when promise rejects', fakeAsync(() => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('ADMIN', () => {
            return Promise.reject();
        });

        detectChanges(fixture);
        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));
});

describe('Permission directive angular testing different async functions in roles via array', () => {
    @Component({selector: 'test-comp',
        template: `<div *permissionsOnly="['ADMIN','GUEST']"><div>123</div></div>`})
    class TestComp {
        data: any;
    }

    let rolesService;
    let permissions;
    let fixture;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComp], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;

        rolesService = fixture.debugElement.injector.get(RolesService);

    });


    it('Should show the component when promise returns truthy value', fakeAsync(() => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        // rolesService.addRole('ADMIN', () => {
        //     return Promise.resolve();
        // });
        rolesService.addRole('ADMIN', () => {
            return true;
        });
        detectChanges(fixture);
        tick();

        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));


    it('Should not show the component when promise returns false value', fakeAsync(() => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);

        rolesService.addRole('ADMIN', () => {
            return false;
        });
        detectChanges(fixture);
        tick();

        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));

    it('Should show the component when promise returns truthy value', fakeAsync(() => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('ADMIN', () => {
            return Promise.resolve(true);
        });
        detectChanges(fixture);
        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));

    it('Should not show the component when promise rejects', fakeAsync(() => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('ADMIN', () => {
            return Promise.reject();
        });

        detectChanges(fixture);
        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));

    it('Should  show the component when one of the promises fulfills ', fakeAsync(() => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('ADMIN', () => {
            return Promise.reject();
        });

        rolesService.addRole('GUEST', () => {
            return Promise.resolve(true);
        });


        detectChanges(fixture);
        tick();
        tick();
        tick();
        fixture.detectChanges()
        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));

    it('Should  show the component when one of the promises fulfills with 0 value', fakeAsync(() => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('ADMIN', () => {
            return Promise.reject();
        });

        rolesService.addRole('GUEST', () => {
            return Promise.resolve();
        });


        detectChanges(fixture);
        tick();
        tick();
        tick();
        fixture.detectChanges()
        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));

    it('Should not show the component when all promises fails', fakeAsync(() => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('ADMIN', () => {
            return Promise.reject();
        });

        rolesService.addRole('GUEST', () => {
            return Promise.reject();
        });


        detectChanges(fixture);
        tick();
        tick();
        tick();
        fixture.detectChanges();
        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));

    it('Should show the component when one of promises returns true', fakeAsync(() => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);


        rolesService.addRole('GUEST', () => {
            return true;
        });


        rolesService.addRole('ADMIN', () => {
            return Promise.reject();
        });

        detectChanges(fixture);
        tick();
        tick();
        tick();
        fixture.detectChanges();
        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));


    it('Should not show the component when all promises fails', fakeAsync(() => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('ADMIN', () => {
            return Promise.reject();
        });

        rolesService.addRole('GUEST', ['awesome']);


        detectChanges(fixture);
        tick();
        tick();
        tick();
        fixture.detectChanges();
        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));


    it('Should show the component when one rejects but another one fullfills', fakeAsync(() => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        rolesService.addRole('ADMIN', () => {
            return Promise.reject();
        });

        rolesService.addRole('awesome', ['GUEST']);


        detectChanges(fixture);
        tick();
        tick();
        tick();
        fixture.detectChanges();
        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));
});

describe('Permission directive angular testing different async functions in permissions via array', () => {
    @Component({selector: 'test-comp',
        template: `<div *permissionsOnly="['ADMIN','GUEST']"><div>123</div></div>`})
    class TestComp {
        data: any;
    }

    let permissionsService;
    let permissions;
    let fixture;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComp], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;

        permissionsService = fixture.debugElement.injector.get(PermissionsService);

    });


    it('Should show the component when promise returns truthy value', fakeAsync(() => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        // rolesService.addRole('ADMIN', () => {
        //     return Promise.resolve();
        // });
        permissionsService.addPermission('ADMIN', () => {
            return true;
        });
        detectChanges(fixture);
        tick();

        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));


    it('Should not show the component when promise returns false value', fakeAsync(() => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);

        permissionsService.addPermission('ADMIN', () => {
            return false;
        });
        detectChanges(fixture);
        tick();

        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));

    it('Should show the component when promise returns truthy value', fakeAsync(() => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', () => {
            return Promise.resolve(true);
        });
        detectChanges(fixture);
        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));

    it('Should not show the component when promise rejects', fakeAsync(() => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', () => {
            return Promise.reject();
        });

        detectChanges(fixture);
        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));

    it('Should  show the component when one of the promises fulfills ', fakeAsync(() => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', () => {
            return Promise.resolve();
        });

        permissionsService.addPermission('GUEST', () => {
            return Promise.reject();
        });


        detectChanges(fixture);
        tick();
        tick();
        tick();
        fixture.detectChanges();
        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));

    it('Should  show the component when one of the promises fulfills with 0 value', fakeAsync(() => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', () => {
            return Promise.resolve();
        });

        permissionsService.addPermission('GUEST', () => {
            return Promise.resolve();
        });


        detectChanges(fixture);
        tick();
        tick();
        tick();
        fixture.detectChanges()
        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));

    it('Should not show the component when all promises fails', fakeAsync(() => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', () => {
            return Promise.reject();
        });

        permissionsService.addPermission('GUEST', () => {
            return Promise.reject();
        });


        detectChanges(fixture);
        tick();
        tick();
        tick();
        fixture.detectChanges();
        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));

    it('Should show the component when one of promises returns true', fakeAsync(() => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);


        permissionsService.addPermission('GUEST', () => {
            return true;
        });


        permissionsService.addPermission('ADMIN', () => {
            return Promise.reject();
        });

        detectChanges(fixture);
        tick();
        tick();
        tick();
        fixture.detectChanges();
        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));


    it('Should not show the component when all promises fails', fakeAsync(() => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', () => {
            return Promise.reject();
        });

        permissionsService.addPermission('GUEST', () => {
            return Promise.resolve(true)
        });


        detectChanges(fixture);
        tick();
        tick();
        tick();
        fixture.detectChanges();
        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));


    it('Should show the component when one rejects but another one fullfills', fakeAsync(() => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', () => {
            return Promise.reject();
        });

        permissionsService.addPermission('GUEST', () => {
            return true;
        });


        detectChanges(fixture);
        tick();
        tick();
        tick();
        fixture.detectChanges();
        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));

    it('Should show the component when one rejects but another one fullfills', fakeAsync(() => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', () => {
            return true;
        });

        permissionsService.addPermission('GUEST', () => {
            return Promise.reject();
        });


        detectChanges(fixture);
        tick();
        tick();
        tick();
        fixture.detectChanges();
        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));

    it('Should show the component when functions with name and store fullfils', fakeAsync(() => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', (name, store) => {
            expect(store[name].name).toBeTruthy();
            return name === 'ADMIN'
        });

        permissionsService.addPermission('GUEST', () => {
            return Promise.reject();
        });


        detectChanges(fixture);
        tick();
        tick();
        tick();
        fixture.detectChanges();
        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));
});


describe('Permission directive angular testing different async functions in permissions via string', () => {
    @Component({selector: 'test-comp',
        template: `<div *permissionsOnly="'ADMIN'"><div>123</div></div>`})
    class TestComp {
        data: any;
    }

    let permissionsService;
    let permissions;
    let fixture;
    let comp;
    beforeEach(() => {
        TestBed.configureTestingModule({declarations: [TestComp], imports: [NgxPermissionsModule.forRoot()]});

        fixture = TestBed.createComponent(TestComp);
        comp = fixture.componentInstance;

        permissionsService = fixture.debugElement.injector.get(PermissionsService);

    });


    it('Should show the component when promise returns truthy value', fakeAsync(() => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        // rolesService.addRole('ADMIN', () => {
        //     return Promise.resolve();
        // });
        permissionsService.addPermission('ADMIN', () => {
            return true;
        });
        detectChanges(fixture);
        tick();

        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));


    it('Should not show the component when promise returns false value', fakeAsync(() => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);

        permissionsService.addPermission('ADMIN', () => {
            return false;
        });
        detectChanges(fixture);
        tick();

        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));

    it('Should show the component when promise returns truthy value', fakeAsync(() => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', () => {
            return Promise.resolve(true);
        });
        detectChanges(fixture);
        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));

    it('Should not show the component when promise rejects', fakeAsync(() => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', () => {
            return Promise.reject();
        });

        detectChanges(fixture);
        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));

    it('Should  show the component when one of the promises fulfills ', fakeAsync(() => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', () => {
            return Promise.resolve();
        });

        permissionsService.addPermission('GUEST', () => {
            return Promise.resolve(true);
        });


        detectChanges(fixture);
        tick();
        tick();
        tick();
        fixture.detectChanges()
        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));

    it('Should  show the component when one of the promises fulfills with 0 value', fakeAsync(() => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', () => {
            return Promise.resolve();
        });

        permissionsService.addPermission('GUEST', () => {
            return Promise.reject();
        });


        detectChanges(fixture);
        tick();
        tick();
        tick();
        fixture.detectChanges()
        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));

    it('Should not show the component when all promises fails', fakeAsync(() => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', () => {
            return Promise.reject();
        });

        permissionsService.addPermission('GUEST', () => {
            return Promise.reject();
        });


        detectChanges(fixture);
        tick();
        tick();
        tick();
        fixture.detectChanges();
        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toEqual(null);
    }));

    it('Should show the component when one of promises returns true', fakeAsync(() => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);


        permissionsService.addPermission('GUEST', () => {
            return Promise.reject();
        });


        permissionsService.addPermission('ADMIN', () => {
            return true;
        });

        detectChanges(fixture);
        tick();
        tick();
        tick();
        fixture.detectChanges();
        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));


    it('Should not show the component when all promises fails', fakeAsync(() => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', () => {
            return Promise.resolve(true)
        });

        permissionsService.addPermission('GUEST', () => {
            return Promise.reject();
        });


        detectChanges(fixture);
        tick();
        tick();
        tick();
        fixture.detectChanges();
        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));


    it('Should show the component when one rejects but another one fullfills', fakeAsync(() => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', () => {
            return true;
        });

        permissionsService.addPermission('GUEST', () => {
            return Promise.reject();
        });


        detectChanges(fixture);
        tick();
        tick();
        tick();
        fixture.detectChanges();
        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));

    it('Should show the component when functions with name and store fullfils', fakeAsync(() => {
        let content = fixture.debugElement.nativeElement.querySelector('div');
        expect(content).toEqual(null);
        permissionsService.addPermission('ADMIN', (name, store) => {
            expect(store[name].name).toBeTruthy();
            return name === 'ADMIN'
        });

        permissionsService.addPermission('GUEST', () => {
            return Promise.reject();
        });


        detectChanges(fixture);
        tick();
        tick();
        tick();
        fixture.detectChanges();
        let content2 = fixture.debugElement.nativeElement.querySelector('div');
        expect(content2).toBeTruthy();
        expect(content2.innerHTML).toEqual('<div>123</div>');
    }));
});


function detectChanges(fixture) {
    tick();
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
}
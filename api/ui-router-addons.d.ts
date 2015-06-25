declare module ui.router.addons
{
    interface IModalStateProvider extends ng.IServiceProvider {
        defaultOptions?: any;
        showModal(id: string, options: any): any;
        hideModal(id: string, object: any): void;
        state(name: string, config: ng.ui.IState): ng.ui.IStateProvider;
    }

    interface IModalStateService {
        showModal(id: string, options: any): any;
        hideModal(id: string, object: any): void;
        exit(): void;
    }
}

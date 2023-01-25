interface Component {
    name: string;
    Component: any;
}

export abstract class CmsPluginServiceProvider {

    protected objects: Component[]
    protected inputs: Component[]

    abstract init(): void;

    addObject(name: string, Component: any) {
        this.objects.push({name, Component});
    }
    addInput(name: string, Component: any) {
        this.inputs.push({name, Component});
    }

    getObjects() {
        return this.objects;
    }
    getInputs() {
        return this.objects;
    }

}
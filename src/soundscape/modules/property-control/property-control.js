import utils from '../../services/utils';
import scpEvents from '../../services/soundscape-events';

var propertyControlDefaults = {
        propertyName: null,
        controlType: 'slider_control',
        followModuleId: null,
        sliderValue: 0,
        value: 0,
        graph: []
    };

class PropertyControl {
    constructor (config, data) {
        this.moduleId = config.moduleId;
        this.model = Object.assign({}, propertyControlDefaults, data);
    }

    remove () {
        console.log('remove');
    }

    // Getters & Setters
    get data () {
        return this.model;
    }

    set data (data) {
        Object.assign(this.model, data);
    }

    get controlType () {
        return this.model.controlType;
    }

    set controlType (controlType) {
        this.model.controlType = controlType;
    }

    get sliderValue () {
        return this.model.sliderData;
    }

    set slideValue (sliderValue) {
        this.model.slideValue = slideValue;
    }

    get followModuleId () {
        return this.model.followModuleId;
    }

    set followModuleId (moduleId) {
        this.model.followModuleId = moduleId;
    }

    get graph () {
        return this.model.graph;
    }

    set graph (graph) {
        this.model.graph = graph;
    }

    get value () {
        return this.model.value;
    }

    set value (value) {
        this.model.value = value;
    }
}

export default PropertyControl;

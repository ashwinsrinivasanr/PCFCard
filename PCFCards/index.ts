/* eslint-disable @typescript-eslint/no-explicit-any */
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { PCFCard, IPCFCardProps } from "./PCFCard";
import * as React from "react";

export class PCFCards
  implements ComponentFramework.ReactControl<IInputs, IOutputs>
{
  private notifyOutputChanged: () => void;
  private _context: ComponentFramework.Context<IInputs>;
  private _entityData: any[] = [];

  /**
   * Empty constructor.
   */
  constructor() {
    // Empty
  }

  /**
   * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
   * Data-set values are not initialized here, use updateView.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
   * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
   * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
   */
  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary
  ): void {
    this._context = context;
    this.notifyOutputChanged = notifyOutputChanged;
    void this.getEntityData("ash_valuedriver")
      .then((data) => {
        this.notifyOutputChanged();
        return "";
      })
      .catch((error) => {
        console.error("Error fetching entity data:", error);
        throw error;
      });
  }

  /**
   * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
   * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
   * @returns ReactElement root react element for the control
   */
  public updateView(
    context: ComponentFramework.Context<IInputs>
  ): React.ReactElement {
    const props: IPCFCardProps = {
      entityData: this._entityData,
    };
    return React.createElement(PCFCard, props);
  }

  /**
   * It is called by the framework prior to a control receiving new data.
   * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
   */
  public getOutputs(): IOutputs {
    return {};
  }

  /**
   * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
   * i.e. cancelling any pending remote calls, removing listeners, etc.
   */
  public destroy(): void {
    // Add code to cleanup control if necessary
  }

  private async getEntityData(entityName: string) {
    try {
      const result = await this._context.webAPI.retrieveMultipleRecords(
        entityName,
        "?$top=5"
      );

      if (result.entities.length > 0) {
        this._entityData = result.entities;
        console.log("PCF Fetched Data:", result.entities);
        this.notifyOutputChanged();
      }
    } catch (error) {
      console.error("Error fetching entity data:", error);
    }
  }
}

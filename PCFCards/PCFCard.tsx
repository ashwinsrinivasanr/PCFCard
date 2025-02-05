/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';

export interface IPCFCardProps {
  entityData: any[];
}

export class PCFCard extends React.Component<IPCFCardProps> {
  public render(): React.ReactNode {
    return (
      <div>
      <div id="toast-container"></div>
      <div className="row">
          {this.props.entityData?.map((record, index) => (
            <div className="col-sm-6" key={index}>
            <div className="card  mx-auto">
              <div className="card-body">
                <h5 className="card-title">{record.ash_name}</h5>
                <p className="card-text">{record.ash_description}</p>
                <a href={record.ash_url} className="btn btn-primary">
                  Click Here
                </a>
              </div>
            </div>
            </div>
          ))}
      </div>
    </div>
    )
  }
}

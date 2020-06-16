import React, {Component} from 'react';
import {AutoCrudDefaults} from "../../Defaults/AutoCrudDefaults";

interface ToolbarComponentProps {
    noSearch?: boolean;
    wrapperClassName?: string;
    searchInputClassName?: string;
    searchInputPlaceholder?: string;
    onSearch?: (value: string) => void;
    page: any;
    actions?: any[];
}

interface State {
    searchValue: string;
}

class ToolbarComponent extends Component<ToolbarComponentProps, State> {

    static defaultProps: Partial<ToolbarComponentProps> = {
        noSearch: false,
        wrapperClassName: AutoCrudDefaults.classNames.toolbar.wrapper,
        searchInputClassName: AutoCrudDefaults.classNames.toolbar.searchInput
    };

    constructor(props: ToolbarComponentProps) {
        super(props);
        this.state = {searchValue: ''};
    }


    render() {
        return (
            <div className={`__crud-toolbar ${this.props.wrapperClassName}`}>
                <div>
                    {
                        !this.props.noSearch && this.renderSearch()
                    }
                </div>
                <div>
                    {
                        this.renderActions()
                    }
                </div>
            </div>
        );
    }

    protected renderSearch = () => {
        return <input className={this.props.searchInputClassName}
                      value={this.state.searchValue}
                      onChange={e => this.setState({searchValue: e.target.value})}
                      onKeyUp={e => {
                          if (e.key === "Enter" && this.props.onSearch) {
                              this.props.onSearch(this.state.searchValue);
                          }
                      }}
                      placeholder={this.props.searchInputPlaceholder}/>;
    };


    public renderActions = () => {
        if (!this.props.actions)
            return null;
        return this.props.actions.map((action: any, index: number) => {
            return <React.Fragment key={index}>
                {action(this.props.page)}
            </React.Fragment>
        });
    }

}

export default ToolbarComponent;
import {Component, Input, SimpleChanges} from '@angular/core';

@Component({
    selector: 'app-paginator',
    templateUrl: './paginator.component.html'
})
export class PaginatorComponent {
    @Input() paginator: any;
    public pages: number[] = [];
    public from: number = 0;
    public to: number = 0;

    ngOnInit(): void {
        this.initPaginator();
    }

    ngOnChanges( changes: SimpleChanges ): void {
        if ( changes['paginator'].previousValue ) {
            this.initPaginator();
        }
    }

    private initPaginator(): void {
        this.from = Math.min( Math.max( 1, this.paginator.number - 4 ), this.paginator.totalPages - 5 );
        this.to = Math.max( Math.min( this.paginator.totalPages, this.paginator.number + 4 ), 6 );

        if ( this.paginator.totalPages > 5 ) {
            this.pages = new Array( this.to - this.from + 1 )
                .fill(0)
                .map(( _value, index ) => index  + this.from);
        } else {
            this.pages = new Array( this.paginator.totalPages )
                .fill(0)
                .map(( _value, index ) => index + 1 );
        }
    }
}

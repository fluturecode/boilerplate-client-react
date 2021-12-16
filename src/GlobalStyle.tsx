import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    *,
    *::after,
    *::before {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    html,
    body {
        min-height: 100vh;
        background: #fafafa;
    }
    body {
    }
    a {
        text-decoration: none;
    }

    button.btn:disabled {
        cursor: not-allowed;
        pointer-events: unset;
    }

    .btn {
        text-transform: uppercase;
        font-weight: 300;
    }

    .table-responsive {
        overflow-x: inherit;
    }

    .badge {
        padding: 0.4rem 0.75rem;

        &.bg-warning {
            background: #eaf0e3 !important;
            color: #dc7906;
        }

        &.bg-danger {
            background: #eae6e5 !important;
            color: #cc1503;
        }

        &.bg-secondary {
            background: #ddd !important;
            color: #555;
        }

        &.bg-info {
            background: #e3edfc !important;
            color: #37aaa5;
        }
    }

    .btn.btn-secondary {
        border: none;
        background: #efefef;
        color: #666;
        font-weight: 400;
        padding-left: 1rem;
        padding-right: 1rem;

        &:hover {
            background: #dadada;
        }
    }

    label {
        margin-bottom: .25rem !important;
        margin-top: .5rem;
        font-size: 0.825rem;
        font-weight: 500;
        color: #555;
    }

    `;
export default GlobalStyle;

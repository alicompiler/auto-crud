export interface IComponentConfigDefaults  {
    progressIndicator: {
        height: number,
        bgColor: string;
        progressColor: string;
    }
}

export const componentConfigDefaults : IComponentConfigDefaults = {
    progressIndicator: {
        height: 5, bgColor: 'rgba(5, 114, 206, 0.2)', progressColor: 'rgba(5, 114, 206)',
    }
}
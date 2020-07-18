

(function ($) {
    // import { Observer } from './observer'
    // import { Leaker } from './leaker'
    const observer = new Observer();
    observer.init();// 全局自生自灭
    let leak
    $(".start_button").click(function () {
        const type = $(this).attr("exampleType");
        if (!leak) {
            const params = [type]
            if (type == 3) {
                params.push(null)
            } else if (type == 4) {
                params.push(null)
                params.push(observer)
            }
            leak = new Leaker(...params);
        } else {
            console.info('leaker:', leak)
        }
    });

    $(".destroy_button").click(function () {
        if (leak) {
            leak.destroy();
        }
        leak = null;
        console.info('click destory button,leak is:', leak)
    });
    $(".destroy_loop_button").click(function () {
        if (leak) {
            leak.destroyLoop();
        }
        leak = null;
    });
    $(".clear_observer_button").click(function () {
        observer.removeAll()
    });
})(window.$)



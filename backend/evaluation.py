from pipeline import PipelineCloud
import base64

api = PipelineCloud(token="pipeline_sk_o8XEPN6nA2gttTlIPS7IM-6iVasoqyjr")
def gen_image(caption):
    run = api.run_pipeline(
    "pipeline_f48996c857e94c1eb22b1c7393e478f2",
    [
        [caption],
        {
            "num_samples": 1
        },
    ],
    )
    obj = run.result_preview[0]
    
    return base64.b64decode(obj[0]['samples'][0])

    


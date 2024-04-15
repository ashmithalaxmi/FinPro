{{
    config(
        tags=['mart']
    )
}}

WITH

stg_user AS (

    SELECT

        user_ID, 
        user_name, 
        role

    FROM {{ ref('stg_user') }}
),

stg_project AS (

    SELECT

        project_id, 
        project_name

    FROM {{ ref('stg_project') }}

),

stg_projassign AS (
    SELECT

        *

    FROM {{ ref('stg_projassign') }}
),

left_join_user_proj AS (
    SELECT
        u.*,
        p.*,
        a.allocation_start, 
        a.allocation_end
    FROM stg_user u
    LEFT JOIN 
        stg_projassign a ON u.user_ID = a.user_ID
    LEFT JOIN 
        stg_project p ON a.project_id = p.project_id
),

stg_timesheet AS (
    SELECT

        *

    FROM {{ ref('stg_timesheet') }}
),

stg_feedback AS (
    SELECT

        *

    FROM {{ ref('stg_feedback') }}
),

left_join_user_time AS (
    SELECT
        up.*,
        t.activity, 
        t.mon_hrs, 
        t.tue_hrs, 
        t.wed_hrs,  
        t.thur_hrs, 
        t.fri_hrs, 
        t.sat_hrs
    FROM left_join_user_proj up
    LEFT JOIN 
        stg_timesheet t ON up.user_ID = t.user_ID
),

left_join_time_feed AS (
    SELECT
        ut.*,
        f.q1, 
        f.q2, 
        f.q3, 
        f.q4, 
        f.q5, 
        f.user_comments
    FROM left_join_user_time ut
    LEFT JOIN 
        stg_feedback f ON ut.user_ID = f.user_ID
)

SELECT * FROM  left_join_time_feed
